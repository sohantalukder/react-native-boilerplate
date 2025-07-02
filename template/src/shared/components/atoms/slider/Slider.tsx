import { useTheme } from '@/theme';
import type { Borders } from '@/theme/types/borders';
import type { Colors } from '@/theme/types/colors';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const config = {
  knobSize: 20,
  sliderHeight: 4,
  sliderWidth: 300,
  activeKnobScale: 1.2,
};

const scaleSpringConfig = {
  mass: 0.5,
  damping: 15,
  stiffness: 200,
};

const positionSpringConfig = {
  mass: 0.2,
  damping: 50,
  stiffness: 300,
};

/**
 * Properties for the Slider component.
 */
type Properties = {
  /**
   * Minimum value of the slider.
   * @default 0
   */
  min: number;
  /**
   * Maximum value of the slider.
   * @default 100
   */
  max: number;
  /**
   * Initial value of the slider.
   * @default min
   */
  initialValue?: number;
  /**
   * Width of the slider.
   * @default 300
   */
  width?: number;
  /**
   * Callback function triggered when the slider's value changes.
   */
  onValueChange: (value: number) => void;
  /**
   * Current value of the slider (controlled component).
   */
  value?: number;
  /**
   * Test ID for testing purposes.
   */
  testID?: string;
};

const Slider: React.FC<Properties> = ({
  min,
  max,
  width = config.sliderWidth,
  initialValue = min,
  onValueChange,
  value,
  testID,
}) => {
  const { colors, borders } = useTheme();
  const sliderWidth = width - config.knobSize;
  const styles = useMemo(() => stylesheet(colors, borders), [colors, borders]);

  const getPositionFromValue = useCallback(
    (val: number) => {
      'worklet';
      return ((val - min) / (max - min)) * sliderWidth;
    },
    [min, max, sliderWidth]
  );

  const position = useSharedValue(
    initialValue !== undefined ? getPositionFromValue(initialValue) : 0
  );

  // Update position when value changes (for controlled component)
  useEffect(() => {
    if (value !== undefined) {
      position.value = withSpring(
        getPositionFromValue(value),
        positionSpringConfig
      );
    }
  }, [value, getPositionFromValue, position]);

  const prevPosition = useSharedValue(0);
  const knobScale = useSharedValue(1);

  const getSliderValue = useCallback(
    (pos: number) => {
      'worklet';
      return Math.round((pos / sliderWidth) * (max - min) + min);
    },
    [max, min, sliderWidth]
  );

  const notifyValueChange = useCallback(() => {
    'worklet';
    const newValue = getSliderValue(position.value);
    runOnJS(onValueChange)(newValue);
  }, [getSliderValue, onValueChange, position]);

  const gesture = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      'worklet';
      prevPosition.value = position.value;
      knobScale.value = withSpring(config.activeKnobScale, scaleSpringConfig);
    })
    .onUpdate((e) => {
      'worklet';
      const newPosition = prevPosition.value + e.translationX;
      position.value = Math.max(0, Math.min(newPosition, sliderWidth));
      notifyValueChange();
    })
    .onFinalize(() => {
      'worklet';
      knobScale.value = withSpring(1, scaleSpringConfig);
      position.value = withSpring(position.value, positionSpringConfig);
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }, { scale: knobScale.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: position.value,
  }));

  return (
    <View
      style={styles.container}
      testID={testID}
    >
      <View style={[styles.slider, { width }]}>
        <Animated.View style={[styles.fill, fillStyle]} />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.knob, knobStyle]}
            testID={`${testID}-knob`}
          />
        </GestureDetector>
      </View>
    </View>
  );
};

const stylesheet = (colors: Colors, borders: Borders) =>
  StyleSheet.create({
    container: {
      minHeight: config.sliderHeight + config.knobSize,
      paddingTop: config.knobSize / 2,
    },
    fill: {
      backgroundColor: colors.primary,
      height: config.sliderHeight,
      ...borders.rounded_24,
      left: 0,
      position: 'absolute',
    },
    knob: {
      height: config.knobSize,
      width: config.knobSize,
      ...borders.rounded_24,
      backgroundColor: colors.primary,
      left: 0,
      position: 'absolute',
      top: -(config.knobSize / 2 - config.sliderHeight / 2),
    },
    slider: {
      backgroundColor: colors.background,
      height: config.sliderHeight,
      ...borders.rounded_24,
    },
  });

export default Slider;
