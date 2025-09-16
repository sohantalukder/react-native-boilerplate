import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { ComponentType } from 'react';
import { Dimensions } from 'react-native';
import {
  BottomSheetShowOptions,
  BottomSheetShowParams,
  BottomSheetState,
  BottomSheetListener,
  BottomSheetError,
  DEFAULT_SNAP_POINTS,
  DEFAULT_BACKDROP_OPACITY,
  DEFAULT_ANIMATION_DURATION,
} from './types';
import { logger } from '@/ignoreWarnings';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const DEFAULT_OPTIONS: Required<BottomSheetShowOptions> = {
  snapPoints: [],
  initialSnapIndex: 1,
  backdrop: true,
  backdropOpacity: DEFAULT_BACKDROP_OPACITY,
  enablePanDownToClose: true,
  snapToClose: true,
  enableDynamicSizing: false,
  minHeight: 200,
  maxHeight: SCREEN_HEIGHT * 0.9,
  containerStyle: {},
  handleStyle: {},
  backdropStyle: {},
  onClose: () => {},
  onOpen: () => {},
  onSnapPointChange: () => {},
  maxDynamicHeight: 0,
  handleComponent: null,
};

class BottomSheetManager {
  private bottomSheetRef: React.RefObject<BottomSheetMethods> | null = null;
  private state: BottomSheetState = {
    isOpen: false,
    snapIndex: -1,
    component: null,
    props: {},
    options: DEFAULT_OPTIONS,
  };
  private readonly listeners: Set<BottomSheetListener> = new Set();
  private contentHeight: number = 0;
  private isAnimating: boolean = false;
  private animationTimeout: NodeJS.Timeout | null = null;
  private isMounted: boolean = true;

  setRef = (ref: React.RefObject<BottomSheetMethods>): void => {
    this.bottomSheetRef = ref;
  };

  subscribe = <T extends Record<string, unknown> = Record<string, unknown>>(
    listener: BottomSheetListener<T>
  ): (() => void) => {
    const typedListener = listener as BottomSheetListener;
    this.listeners.add(typedListener);
    typedListener(this.state);

    return () => {
      this.listeners.delete(typedListener);
    };
  };

  getState = (): Readonly<BottomSheetState> => {
    return Object.freeze({ ...this.state });
  };

  private readonly notify = (): void => {
    if (!this.isMounted) return;

    const frozenState = Object.freeze({ ...this.state });
    this.listeners.forEach((listener) => {
      try {
        listener(frozenState);
      } catch (error) {
        logger.error('Error in bottom sheet listener:', error);
      }
    });
  };

  private readonly setState = <K extends keyof BottomSheetState>(
    updates: Pick<BottomSheetState, K> | Partial<BottomSheetState>
  ): void => {
    this.state = { ...this.state, ...updates };
    this.notify();
  };

  private readonly clearAnimationTimeout = (): void => {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  };

  private readonly validateSnapPoints = (
    snapPoints: (string | number)[]
  ): void => {
    if (!Array.isArray(snapPoints)) {
      throw new BottomSheetError(
        'Snap points must be an array',
        'INVALID_INDEX'
      );
    }

    if (snapPoints.length === 0) {
      throw new BottomSheetError(
        'Snap points array cannot be empty',
        'INVALID_INDEX'
      );
    }

    for (const point of snapPoints) {
      if (
        typeof point === 'string' &&
        !point.includes('%') &&
        !point.includes('px')
      ) {
        throw new BottomSheetError(
          `Invalid snap point format: ${point}`,
          'INVALID_INDEX'
        );
      }
    }
  };

  private readonly generateSnapPoints = (
    options: BottomSheetShowOptions,
    contentHeight: number
  ): (string | number)[] => {
    if (options.snapPoints && options.snapPoints.length > 0) {
      this.validateSnapPoints(options.snapPoints);
      return options.snapPoints;
    }

    if (options.enableDynamicSizing && contentHeight > 0) {
      const minHeight = options.minHeight ?? DEFAULT_OPTIONS.minHeight;
      const maxHeight = options.maxHeight ?? DEFAULT_OPTIONS.maxHeight;

      const dynamicHeight = Math.max(
        minHeight,
        Math.min(contentHeight + 100, maxHeight)
      );
      const percentage = Math.round((dynamicHeight / SCREEN_HEIGHT) * 100);

      return [`${Math.min(percentage, 90)}%`];
    }

    return [...DEFAULT_SNAP_POINTS];
  };

  private readonly mergeOptions = (
    userOptions: Partial<BottomSheetShowOptions> = {}
  ): BottomSheetShowOptions => {
    return { ...DEFAULT_OPTIONS, ...userOptions };
  };

  /**
   * Shows a bottom sheet with the specified component and options
   * @param params - Configuration for the bottom sheet
   * @returns Promise that resolves when the sheet is fully opened
   * @throws {BottomSheetError} When animation is in progress or ref is unavailable
   */
  show = <T extends Record<string, unknown> = Record<string, unknown>>({
    component,
    componentProps = {} as T,
    options = {},
  }: BottomSheetShowParams<T>): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.isMounted) {
        const error = new BottomSheetError(
          'BottomSheet manager is destroyed',
          'COMPONENT_UNMOUNTED'
        );
        reject(error);
        return;
      }

      if (this.isAnimating) {
        const error = new BottomSheetError(
          'Animation in progress',
          'ANIMATION_IN_PROGRESS'
        );
        reject(error);
        return;
      }

      if (!this.bottomSheetRef?.current) {
        const error = new BottomSheetError(
          'BottomSheet ref not available',
          'REF_NOT_AVAILABLE'
        );
        reject(error);
        return;
      }

      try {
        const mergedOptions = this.mergeOptions(options);
        const snapPoints = this.generateSnapPoints(
          mergedOptions,
          this.contentHeight
        );
        const targetIndex = Math.min(
          Math.max(mergedOptions.initialSnapIndex ?? 0, 0),
          snapPoints.length - 1
        );

        // Update state first
        this.setState({
          component: component as ComponentType<Record<string, unknown>>,
          props: componentProps as Record<string, unknown>,
          options: { ...mergedOptions, snapPoints },
          isOpen: true,
          snapIndex: targetIndex,
        });

        this.isAnimating = true;
        this.clearAnimationTimeout();

        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          if (!this.isMounted) {
            this.isAnimating = false;
            const error = new BottomSheetError(
              'BottomSheet manager destroyed during animation',
              'COMPONENT_UNMOUNTED'
            );
            reject(error);
            return;
          }

          if (!this.bottomSheetRef?.current) {
            this.isAnimating = false;
            const error = new BottomSheetError(
              'BottomSheet ref lost during animation',
              'REF_NOT_AVAILABLE'
            );
            reject(error);
            return;
          }

          try {
            this.bottomSheetRef.current.snapToIndex(targetIndex);

            if (mergedOptions.onOpen) {
              mergedOptions.onOpen();
            }

            this.isAnimating = false;
            resolve();
          } catch (error) {
            logger.error('Error opening bottom sheet:', error);
            this.isAnimating = false;
            const bottomSheetError = new BottomSheetError(
              error instanceof Error
                ? error.message
                : 'Unknown error opening bottom sheet',
              'REF_NOT_AVAILABLE'
            );
            reject(bottomSheetError);
          }
        });
      } catch (error) {
        logger.error('Error opening bottom sheet:', error);
        this.isAnimating = false;
        const bottomSheetError = new BottomSheetError(
          error instanceof Error
            ? error.message
            : 'Unknown error opening bottom sheet',
          'REF_NOT_AVAILABLE'
        );
        reject(bottomSheetError);
      }
    });
  };

  /**
   * Closes the bottom sheet with animation
   * @returns Promise that resolves when the sheet is fully closed
   */
  close = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!this.isMounted) {
        resolve();
        return;
      }

      if (this.isAnimating) {
        resolve();
        return;
      }

      if (!this.state.isOpen) {
        resolve();
        return;
      }

      this.isAnimating = true;

      // First call the ref's close method to trigger the animation
      if (this.bottomSheetRef?.current) {
        try {
          this.bottomSheetRef.current.close();
        } catch (error) {
          logger.error('Error closing bottom sheet:', error);
        }
      }

      if (this.state.options.onClose) {
        this.state.options.onClose();
      }

      this.clearAnimationTimeout();
      this.animationTimeout = setTimeout(() => {
        if (this.isMounted) {
          this.setState({
            isOpen: false,
            snapIndex: -1,
            component: null,
            props: {},
            options: DEFAULT_OPTIONS,
          });
          this.contentHeight = 0;
        }
        this.isAnimating = false;
        resolve();
      }, DEFAULT_ANIMATION_DURATION);
    });
  };

  /**
   * Snaps the bottom sheet to a specific index
   * @param index - The target snap index
   * @returns Promise that resolves when the snap animation completes
   * @throws {BottomSheetError} When animation is in progress or index is invalid
   */
  snapToIndex = (index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.isMounted) {
        const error = new BottomSheetError(
          'BottomSheet manager is destroyed',
          'COMPONENT_UNMOUNTED'
        );
        reject(error);
        return;
      }

      if (this.isAnimating) {
        const error = new BottomSheetError(
          'Animation in progress',
          'ANIMATION_IN_PROGRESS'
        );
        reject(error);
        return;
      }

      if (!this.bottomSheetRef?.current) {
        const error = new BottomSheetError(
          'BottomSheet ref not available',
          'REF_NOT_AVAILABLE'
        );
        reject(error);
        return;
      }

      const snapPointsLength = this.state.options.snapPoints?.length ?? 0;
      if (index < -1 || index >= snapPointsLength) {
        const error = new BottomSheetError(
          `Invalid snap index: ${index}`,
          'INVALID_INDEX'
        );
        reject(error);
        return;
      }

      try {
        this.bottomSheetRef.current.snapToIndex(index);
        this.setState({ snapIndex: index });
        resolve();
      } catch (error) {
        const bottomSheetError = new BottomSheetError(
          error instanceof Error
            ? error.message
            : 'Unknown error snapping to index',
          'REF_NOT_AVAILABLE'
        );
        reject(bottomSheetError);
      }
    });
  };

  collapse = (): Promise<void> => {
    return this.snapToIndex(0);
  };

  onSnapPointChange = (index: number): void => {
    this.setState({ snapIndex: index });

    if (this.state.options.onSnapPointChange) {
      this.state.options.onSnapPointChange(index);
    }

    if (index === -1 && this.state.isOpen) {
      this.setState({
        isOpen: false,
        component: null,
        props: {},
        options: DEFAULT_OPTIONS,
      });
      this.contentHeight = 0;

      if (this.state.options.onClose) {
        this.state.options.onClose();
      }
    }
  };

  setContentHeight = (height: number): void => {
    if (!this.state.options.enableDynamicSizing || height <= 0) {
      return;
    }

    this.contentHeight = height;

    if (this.state.isOpen) {
      const newSnapPoints = this.generateSnapPoints(this.state.options, height);
      this.setState({
        options: {
          ...this.state.options,
          snapPoints: newSnapPoints,
        },
      });
    }
  };

  // Utility methods
  isExpanded = (): boolean => {
    const snapPointsLength = this.state.options.snapPoints?.length ?? 0;
    return this.state.snapIndex === snapPointsLength - 1;
  };

  isCollapsed = (): boolean => {
    return this.state.snapIndex === 0;
  };

  isOpen = (): boolean => {
    return this.state.isOpen && this.state.snapIndex > -1;
  };

  getCurrentSnapIndex = (): number => {
    return this.state.snapIndex;
  };

  getContentHeight = (): number => {
    return this.contentHeight;
  };

  isAnimationInProgress = (): boolean => {
    return this.isAnimating;
  };

  /**
   * Destroys the bottom sheet manager and cleans up all resources
   */
  destroy = (): void => {
    this.isMounted = false;
    this.clearAnimationTimeout();
    this.listeners.clear();
    this.bottomSheetRef = null;
    this.setState({
      isOpen: false,
      snapIndex: -1,
      component: null,
      props: {},
      options: DEFAULT_OPTIONS,
    });
    this.contentHeight = 0;
    this.isAnimating = false;
  };
}

export const bottomSheet = new BottomSheetManager();
