import { useTheme } from '@/theme';
import React, { useEffect, useRef } from 'react';
import type { DimensionValue, ViewStyle } from 'react-native';
import { Animated, Platform } from 'react-native';

/**
 * Properties for the Skeleton component.
 */
type Properties = {
  /**
   * The width of the skeleton.
   */
  width?: DimensionValue;
  /**
   * The height of the skeleton.
   */
  height?: DimensionValue;
  /**
   * The border radius of the skeleton.
   */
  borderRadius?: number;
  /**
   * The background color of the skeleton.
   */
  bgColor?: string;
  /**
   * The style of the skeleton.
   */
  style?: ViewStyle;
};

const nativeDriver = (flag = true) => {
  return Platform.OS === 'android' ? flag : false;
};
const Skeleton: React.FC<Properties> = ({
  width = 50,
  height = 30,
  borderRadius = 0,
  bgColor,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3));
  const { colors } = useTheme();
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: nativeDriver(),
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: nativeDriver(),
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      testID="skeleton"
      style={[
        {
          opacity: opacity.current,
          height: height,
          width: width,
          backgroundColor: bgColor ? bgColor : colors.gray6,
          borderRadius: borderRadius,
        },
        style as ViewStyle,
      ]}
    />
  );
};

export default Skeleton;
