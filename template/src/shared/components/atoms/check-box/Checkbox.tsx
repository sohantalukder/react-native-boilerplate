import { useTheme } from '@/theme';
import { default as React, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { IconByVariant } from '@/shared/components/atoms';

const config = {
  size: 20,
};

/**
 * Props for the Checkbox component.
 */
type Properties = {
  /**
   * Whether the checkbox is checked.
   * @default false
   */
  checked?: boolean;

  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The size of the checkbox.
   * @default 24
   */
  size?: number;
  /**
   * The press handler for the checkbox.
   */
  onPress?: () => void;
  /**
   * The testID for the checkbox.
   */
  testID?: string;
};

const Checkbox: React.FC<Properties> = ({
  checked = false,
  disabled = false,
  onPress,
  testID,
}) => {
  const { colors, borders } = useTheme();
  const scale = useSharedValue(1);
  const [isChecked, setIsChecked] = useState(checked);
  const appearance = useSharedValue(0);
  const handlePress = () => {
    setIsChecked(!isChecked);
    onPress?.();
  };
  /**
   * Effect to update the checked state when the parent component updates the checked prop.
   */
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  /**
   * Effect to handle the checkbox appearance and scale animations.
   */
  useEffect(() => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100, easing: Easing.bounce }),
      withTiming(1, { duration: 100 })
    );

    appearance.value = withDelay(
      30,
      withTiming(isChecked ? 1 : 0, { duration: 200 })
    );
  }, [isChecked, scale, appearance]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      appearance.value,
      [0, 1],
      [colors.background, colors.primary]
    ),
    borderColor: interpolateColor(
      appearance.value,
      [0, 1],
      [colors.primary, colors.primary]
    ),
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: appearance.value,
  }));

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
      style={{
        width: config.size,
        height: config.size,
      }}
    >
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          borders.rounded_8,
          disabled && styles.containerDisabled,
        ]}
      >
        <Animated.View style={iconStyle}>
          <IconByVariant
            path="check"
            height={16}
            width={16}
            color={colors.white}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default Checkbox;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    height: config.size,
    justifyContent: 'center',
    width: config.size,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});
