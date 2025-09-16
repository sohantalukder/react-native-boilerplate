import { useTheme } from '@/theme';
import React, { useEffect, useMemo, useRef } from 'react';
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { Animated } from 'react-native';

/**
 * Properties for the Skeleton component.
 */
type Properties = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
};

const Skeleton: React.FC<Properties> = ({
  width = 50,
  height = 30,
  borderRadius = 4,
  bgColor,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    const animate = () => {
      shimmerAnim.setValue(0);
      Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    };

    animate();

    return () => {
      shimmerAnim.stopAnimation();
      shimmerAnim.setValue(0);
    };
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  const baseColor = bgColor || colors.gray6;
  const containerStyle = useMemo(
    () => ({
      height,
      width,
      backgroundColor: baseColor,
      borderRadius,
      overflow: 'hidden' as const,
      opacity,
    }),
    [baseColor, borderRadius, height, width, opacity]
  );

  const shimmerStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      top: 0,
      left: '-100%' as `${number}%`,
      height: '100%' as `${number}%`,
      width: '100%' as `${number}%`,
      backgroundColor: colors.skeleton,
      transform: [
        {
          translateX,
        },
        {
          skewX: '-20deg',
        },
      ],
    }),
    [colors.skeleton, translateX]
  );

  return (
    <Animated.View
      testID="skeleton"
      style={[containerStyle, style]}
    >
      <Animated.View style={shimmerStyle} />
    </Animated.View>
  );
};

export default Skeleton;
