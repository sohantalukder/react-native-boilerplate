import { useMemo, useRef, useEffect } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Animated } from 'react-native';
import { useTheme } from '@/theme';

interface AnimatedLabelProps {
  /**
   * The label to display
   */
  readonly label: string;

  /**
   * The style of the label
   */
  readonly labelStyle?: StyleProp<TextStyle>;

  /**
   * The value of the input
   */
  readonly value: string;

  /**
   * Whether the input is focused
   */
  readonly isFocused?: boolean;
}

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({
  label,
  labelStyle,
  value,
  isFocused = false,
}) => {
  const shouldAnimateUp = value.length > 0 || isFocused;

  // Track if this is the first render
  const isFirstRender = useRef(true);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { colors, typographies } = useTheme();

  useEffect(() => {
    const targetValue = shouldAnimateUp ? 1 : 0;

    // On first render with existing value, animate immediately
    // Otherwise use normal animation
    const duration = isFirstRender.current && shouldAnimateUp ? 200 : 200;

    Animated.timing(animatedValue, {
      toValue: targetValue,
      duration,
      useNativeDriver: false,
    }).start();

    isFirstRender.current = false;
  }, [shouldAnimateUp, animatedValue]);

  const labelTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -23],
  });

  const labelScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const labelColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.gray6, colors.text],
  });

  const styles = useMemo(
    () => ({
      label: {
        position: 'absolute' as const,
        left: 12,
        top: 14,
        ...typographies.body1,
        backgroundColor: colors.background,
        paddingHorizontal: 4,
        zIndex: 1,
      },
    }),
    [colors.background, typographies.body1]
  );

  if (!label) return null;

  return (
    <Animated.Text
      style={[
        styles.label,
        labelStyle,
        {
          transform: [{ translateY: labelTranslateY }, { scale: labelScale }],
          color: labelColor,
        },
      ]}
    >
      {label}
    </Animated.Text>
  );
};

export default AnimatedLabel;
