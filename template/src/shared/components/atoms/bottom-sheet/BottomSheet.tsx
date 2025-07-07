import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  BackHandler,
  Platform,
  InteractionManager,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { WithTimingConfig } from 'react-native-reanimated';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import rs from '@/shared/utilities/responsiveSize';
import withOpacity from '@/shared/utilities/withOpacity';
import type { Colors } from '@/theme/types/colors';

// Move configs outside component to prevent recreation
const WITH_TIMING_CONFIG: WithTimingConfig = {
  duration: 400,
  easing: Easing.inOut(Easing.cubic),
};

/**
 * Properties for the BottomSheet component.
 */
type Properties = PropsWithChildren<{
  /**
   * Whether the bottom sheet is visible.
   */
  readonly visible: boolean;
  /**
   * Callback function to handle the request to close the bottom sheet.
   */
  readonly onRequestClose: () => void;
  /**
   * Callback function triggered when the bottom sheet is fully closed.
   */
  readonly onClose?: () => void;
  /**
   * The content to display inside the bottom sheet.
   */
  readonly children: React.ReactNode;
  /**
   * The maximum height of the bottom sheet.
   */
  readonly maxHeight?: number;
  /**
   * Whether to enable swipe-to-close gesture.
   * @default true
   */
  readonly enableSwipeToClose?: boolean;
  /**
   * Whether to enable tap on overlay to close the bottom sheet.
   * @default true
   */
  readonly enableOverlayTapToClose?: boolean;
  /**
   * The minimum height of the bottom sheet.
   * @default 50
   */
  readonly minHeight?: number;
  /**
   * Threshold in pixels to determine when the sheet should close after dragging.
   * @default 100
   */
  readonly closeThreshold?: number;
  /**
   * Whether to handle the hardware back button (Android only).
   * @default true
   */
  readonly handleBackButton?: boolean;
  /**
   * Accessibility label for the bottom sheet.
   */
  readonly accessibilityLabel?: string;
  /**
   * The style of the bottom sheet.
   */
  readonly style?: StyleProp<ViewStyle>;
}>;

/**
 * A customizable bottom sheet component with gesture support.
 */
const BottomSheet: React.FC<Properties> = memo(
  ({
    visible,
    onRequestClose,
    onClose = () => {},
    children,
    maxHeight,
    enableSwipeToClose = true,
    enableOverlayTapToClose = true,
    minHeight = rs('hf') / 4,
    closeThreshold = 100,
    handleBackButton = true,
    accessibilityLabel = 'Bottom sheet',
    style,
  }) => {
    const [isReady, setIsReady] = useState(false);
    const { colors, layout } = useTheme();
    const styles = useMemo(() => stylesheet({ colors }), [colors]);
    const [showModal, setShowModal] = useState(visible);
    const [contentHeight, setContentHeight] = useState<number | undefined>();
    const { height: windowHeight } = useWindowDimensions();

    // Animated values
    const translateY = useSharedValue(windowHeight);
    const overlayOpacity = useSharedValue(0);
    const startY = useSharedValue(0);
    const gestureActive = useSharedValue(false);

    // Calculate max height once
    const bottomSheetMaxHeight = useMemo(
      () =>
        maxHeight
          ? Math.min(maxHeight, windowHeight * 0.9)
          : windowHeight * 0.9,
      [maxHeight, windowHeight]
    );

    // Handle visibility changes
    useEffect(() => {
      if (visible) {
        setShowModal(true);
      }
    }, [visible]);

    // Handle back button on Android
    useEffect(() => {
      if (!handleBackButton || Platform.OS !== 'android') return;

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (visible) {
            onRequestClose();
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }, [visible, onRequestClose, handleBackButton]);

    // Animate the sheet and overlay
    useEffect(() => {
      if (contentHeight) {
        // Animate sheet position
        translateY.value = withTiming(
          visible ? 0 : contentHeight,
          WITH_TIMING_CONFIG
        );

        // Animate overlay opacity
        overlayOpacity.value = withTiming(
          visible ? 0.5 : 0,
          WITH_TIMING_CONFIG,
          () => {
            // Clean up after closing animation
            if (!visible) {
              runOnJS(setShowModal)(false);
              runOnJS(setContentHeight)(undefined);
              runOnJS(onClose)();
            }
          }
        );
      }
    }, [visible, translateY, overlayOpacity, contentHeight, onClose]);

    useEffect(() => {
      const manager = InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
      return () => manager.cancel();
    }, []);
    // Pan gesture handler
    const gesture = Gesture.Pan()
      .enabled(enableSwipeToClose)
      .onStart(() => {
        startY.value = translateY.value;
        gestureActive.value = true;
      })
      .onUpdate((event) => {
        // Only allow dragging down, not up
        const newTranslateY = Math.max(0, startY.value + event.translationY);

        // Apply translation with resistance as it gets further
        translateY.value = newTranslateY;

        // Fade overlay based on translation
        overlayOpacity.value = interpolate(
          newTranslateY,
          [0, contentHeight || windowHeight],
          [0.5, 0],
          Extrapolation.CLAMP
        );
      })
      .onEnd((event) => {
        gestureActive.value = false;

        // Close if dragged past threshold or with high velocity
        if (
          event.translationY > closeThreshold ||
          (event.velocityY > 500 && event.translationY > 20)
        ) {
          translateY.value = withTiming(
            contentHeight ?? windowHeight,
            WITH_TIMING_CONFIG,
            () => {
              runOnJS(onRequestClose)();
            }
          );
          overlayOpacity.value = withTiming(0, WITH_TIMING_CONFIG);
        } else {
          // Snap back to open position
          translateY.value = withTiming(0, WITH_TIMING_CONFIG);
          overlayOpacity.value = withTiming(0.5, WITH_TIMING_CONFIG);
        }
      });

    // Animated styles
    const bottomSheetAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
      opacity: overlayOpacity.value,
    }));

    // Handle bottom sheet layout measurement
    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (!contentHeight) {
          translateY.value = height;
          setContentHeight(height);
        }
      },
      [contentHeight, translateY]
    );

    // Memoize sheet style
    const sheetStyle = useMemo(
      () => [
        styles.sheet,
        { maxHeight: bottomSheetMaxHeight, minHeight },
        bottomSheetAnimatedStyle,
      ],
      [styles.sheet, bottomSheetMaxHeight, minHeight, bottomSheetAnimatedStyle]
    );

    // Memoize overlay style
    const overlayStyle = useMemo(
      () => [
        styles.overlay,
        StyleSheet.absoluteFillObject,
        overlayAnimatedStyle,
      ],
      [styles.overlay, overlayAnimatedStyle]
    );

    // Render nothing when not visible (optimization)
    if (!showModal) return null;

    return (
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={onRequestClose}
        animationType="none"
        statusBarTranslucent
      >
        <GestureDetector gesture={gesture}>
          <View
            style={layout.flex_1}
            accessibilityViewIsModal={visible}
          >
            {/* Overlay */}
            <Animated.View style={overlayStyle}>
              <TouchableWithoutFeedback
                onPress={enableOverlayTapToClose ? onRequestClose : undefined}
                accessibilityRole="button"
                accessibilityLabel="Close bottom sheet"
                accessibilityHint="Closes the bottom sheet dialog"
              >
                <View style={layout.flex_1} />
              </TouchableWithoutFeedback>
            </Animated.View>

            {/* Bottom Sheet */}
            {isReady && (
              <Animated.View
                style={[sheetStyle, style]}
                onLayout={handleLayout}
                accessibilityLabel={accessibilityLabel}
                accessible={true}
                accessibilityViewIsModal={true}
                importantForAccessibility="yes"
              >
                {/* Handle indicator */}
                <View style={styles.handleContainer}>
                  <View style={styles.handle} />
                </View>

                {/* Content */}
                <View style={layout.flex_1}>{children}</View>
              </Animated.View>
            )}
          </View>
        </GestureDetector>
      </Modal>
    );
  }
);

export default BottomSheet;

const stylesheet = ({ colors }: { colors: Colors }) =>
  StyleSheet.create({
    handle: {
      backgroundColor: withOpacity(colors.gray6, 0.9),
      borderRadius: rs(3),
      height: rs(5),
      width: rs(40),
    },
    handleContainer: {
      alignItems: 'center',
      paddingVertical: rs(10),
    },
    overlay: {
      backgroundColor: withOpacity(colors.gray5, 0.5),
      zIndex: 1,
    },
    sheet: {
      backgroundColor: colors.gray9,
      borderTopLeftRadius: rs(20),
      borderTopRightRadius: rs(20),
      bottom: 0,
      elevation: 10,
      left: 0,
      position: 'absolute',
      right: 0,
      shadowColor: colors.gray5,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      zIndex: 2,
    },
  });
