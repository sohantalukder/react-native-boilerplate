import { ComponentType } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Custom error types for better error handling
export class BottomSheetError extends Error {
  constructor(
    message: string,
    public code:
      | 'ANIMATION_IN_PROGRESS'
      | 'REF_NOT_AVAILABLE'
      | 'INVALID_INDEX'
      | 'COMPONENT_UNMOUNTED'
  ) {
    super(message);
    this.name = 'BottomSheetError';
  }
}

// Constants for better maintainability
export const DEFAULT_SNAP_POINTS = ['25%', '35%'] as const;
export const DEFAULT_BACKDROP_OPACITY = 0.3;
export const DEFAULT_ANIMATION_DURATION = 250;

export interface BottomSheetShowOptions {
  backdrop?: boolean;
  enablePanDownToClose?: boolean;
  snapToClose?: boolean;
  backdropOpacity?: number;
  snapPoints?: (string | number)[];
  containerStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  onOpen?: () => void;
  onSnapPointChange?: (index: number) => void;
  initialSnapIndex?: number;
  maxDynamicHeight?: number;
  handleComponent?: React.FC | null;
  enableDynamicSizing?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export interface BottomSheetShowParams<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  component: ComponentType<T>;
  componentProps?: T;
  options?: Partial<BottomSheetShowOptions>;
}

export interface BottomSheetState<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  isOpen: boolean;
  snapIndex: number;
  component: ComponentType<T> | null;
  props: T;
  options: BottomSheetShowOptions;
}

export type BottomSheetListener<
  T extends Record<string, unknown> = Record<string, unknown>,
> = (state: BottomSheetState<T>) => void;
