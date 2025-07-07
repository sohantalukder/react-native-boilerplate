import * as React from 'react';
import type { ViewProps } from 'react-native';
import { Platform, Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { createRippleStyles } from './styles/button.styles';
import type { RippleButtonProps } from './types/type';
import layout from '@/theme/layout';
import withOpacity from '@/shared/utilities/withOpacity';

const DEFAULT_RIPPLE_SCALE = 1;
const DEFAULT_DURATION = 600;
const DEFAULT_RIPPLE_OPACITY = 0.12;

const Ripple = React.memo<RippleButtonProps>(
  ({
    children,
    borderRadius,
    onPress,
    rippleScale = DEFAULT_RIPPLE_SCALE,
    duration = DEFAULT_DURATION,
    overflow = false,
    rippleColor,
    rippleOpacity = DEFAULT_RIPPLE_OPACITY,
    disabled = false,
    style,
    testID,
  }) => {
    const { colors } = useTheme();
    const [radius, setRadius] = React.useState(-1);

    // Get single child component
    const child = React.Children.only(
      children
    ) as React.ReactElement<ViewProps>;

    // Shared values for animations
    const scale = useSharedValue(0);
    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const isAnimating = useSharedValue(false);

    // Memoize ripple styles
    const rippleStyles = React.useMemo(
      () =>
        createRippleStyles(
          rippleColor ?? colors.ripple,
          radius,
          rippleOpacity,
          borderRadius ?? 0,
          overflow
        ),
      [
        rippleColor,
        colors.ripple,
        radius,
        rippleOpacity,
        borderRadius,
        overflow,
      ]
    );

    // Animated styles for ripple
    const rippleAnimatedStyle = useAnimatedStyle(
      () => ({
        top: positionY.value - radius,
        left: positionX.value - radius,
        transform: [{ scale: scale.value }],
      }),
      [radius]
    );

    // Optimized press handler
    const handlePress = React.useCallback(() => {
      if (!disabled && onPress) {
        onPress();
      }
    }, [disabled, onPress]);

    // Start ripple animation
    const startRipple = React.useCallback(
      (x: number, y: number) => {
        'worklet';
        if (disabled) return;

        // Cancel any ongoing animation
        cancelAnimation(scale);

        // Set position and reset scale
        positionX.value = x;
        positionY.value = y;
        scale.value = 0;
        isAnimating.value = true;

        scale.value = withTiming(
          rippleScale,
          {
            duration,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Smooth ease-out
          },
          (finished) => {
            if (finished) {
              isAnimating.value = false;
            }
          }
        );
      },
      [
        disabled,
        rippleScale,
        duration,
        positionX,
        positionY,
        scale,
        isAnimating,
      ]
    );

    // End ripple animation
    const endRipple = React.useCallback(() => {
      'worklet';
      if (disabled) return;

      scale.value = withTiming(0, {
        duration: duration * 0.8, // Slightly longer fade out
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Consistent easing
      });
    }, [disabled, duration, scale]);

    // Create tap gesture
    const tapGesture = React.useMemo(
      () =>
        Gesture.Tap()
          .maxDuration(10000)
          .onTouchesDown((event) => {
            // Start ripple immediately on touch down for better responsiveness
            const touch = event.changedTouches[0];
            if (touch) {
              startRipple(touch.x, touch.y);
            }
          })
          .onEnd(() => {
            runOnJS(handlePress)();
          })
          .onTouchesUp(() => {
            // End ripple on touch up
            endRipple();
          })
          .onTouchesCancelled(() => {
            // Handle cancelled touches
            endRipple();
          })
          .enabled(!disabled),
      [startRipple, endRipple, handlePress, disabled]
    );

    // Layout handler to calculate ripple radius
    const handleLayout = React.useCallback(
      (event: {
        nativeEvent: { layout: { width: number; height: number } };
      }) => {
        const { width, height } = event.nativeEvent.layout;
        const newRadius = Math.sqrt(width ** 2 + height ** 2);
        setRadius(newRadius);
      },
      []
    );

    // Cleanup animation on unmount
    React.useEffect(() => {
      return () => {
        cancelAnimation(scale);
      };
    }, [scale]);
    if (Platform.OS === 'android') {
      return (
        <View
          style={{
            borderRadius,
            overflow: `hidden`,
            ...layout.flexShrink_1,
          }}
        >
          <Pressable
            onPress={handlePress}
            android_ripple={{
              color: rippleColor ?? withOpacity(colors.ripple, 0.12),
            }}
            style={[child.props.style, style]}
          >
            {child.props.children}
          </Pressable>
        </View>
      );
    }
    return (
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          {...child.props}
          style={[child.props.style, style]}
          testID={testID}
        >
          <View
            style={rippleStyles.container}
            onLayout={handleLayout}
          >
            {radius > 0 && (
              <Animated.View
                style={[rippleAnimatedStyle, rippleStyles.button]}
                pointerEvents="none"
              />
            )}
          </View>
          {child.props.children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

Ripple.displayName = 'Ripple';

export default Ripple;
