import React, { useLayoutEffect, useMemo } from 'react';
import { useRef } from 'react';
import type { StyleProp, ViewStyle, ColorValue } from 'react-native';
import { Animated, Easing } from 'react-native';

import { useTheme } from '@/theme';
import { IconByVariant } from '@/shared/components/atoms';

const ANIMATION_CONFIG = {
  toValue: 1,
  duration: 1000,
  easing: Easing.linear,
  useNativeDriver: true,
};

/**
 * Properties for the Loader component.
 */
type Properties = {
  /**
   * The style of the loader.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The color of the loader.
   */
  color?: ColorValue;
};

const Loader: React.FC<Properties> = ({ style, color }) => {
  const spinAnim = useRef(new Animated.Value(0));
  const { layout, colors } = useTheme();
  const interpolateRotation = useMemo(
    () =>
      spinAnim.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    []
  );

  const animatedStyle = useMemo(
    () => ({
      transform: [{ rotate: interpolateRotation }],
    }),
    [interpolateRotation]
  );

  useLayoutEffect(() => {
    Animated.loop(Animated.timing(spinAnim.current, ANIMATION_CONFIG)).start();
  }, []);

  return (
    <Animated.View
      testID="loader"
      style={[layout.alignSelf, animatedStyle, style]}
    >
      <IconByVariant
        path="loader"
        color={color ?? colors.text}
      />
    </Animated.View>
  );
};

export default Loader;
