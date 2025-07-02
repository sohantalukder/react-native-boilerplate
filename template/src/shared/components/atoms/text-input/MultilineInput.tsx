import rs from '@/shared/utilities/responsiveSize';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from '@/theme';

import type { MultilineInputProps } from './types/type';
import { inputStyles } from './styles/input.styles';

const MultilineInput: React.FC<MultilineInputProps> = ({
  containerStyle,
  defaultValue,
  height = rs(150),
  inputStyle = {},
  label = '',
  labelStyle = {},
  name = '',
  numberOfLines = 5,
  onChangeText,
  onChangeValue,
  placeholder,
  ...props
}) => {
  const { colors, gutters, typographies, variant } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputReference = useRef<TextInput>(null);

  // Memoize styles to prevent unnecessary recalculations
  const styles = useMemo(
    () =>
      inputStyles({
        colors,
        variant,
      }),
    [colors, variant]
  );

  // Handle text changes
  const handleChangeText = useCallback(
    (text: string) => {
      if (onChangeValue) {
        onChangeValue(text, name);
      }

      if (onChangeText) {
        onChangeText(text, name);
      }
    },
    [onChangeValue, onChangeText, name]
  );

  // Handle focus event
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Handle blur event
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Get container style based on focus state
  const containerStyles = useMemo(
    () => [
      styles.multiLineContainer,
      isFocused && styles.activeContainer,
      containerStyle,
    ],
    [
      styles.multiLineContainer,
      styles.activeContainer,
      containerStyle,
      isFocused,
    ]
  );

  // Get label style
  const labelStyles = useMemo(
    () => [typographies.body1, gutters.paddingBottom_6, labelStyle],
    [typographies.body1, gutters.paddingBottom_6, labelStyle]
  );

  // Get input style
  const textInputStyles = useMemo(
    () => [styles.input, { height }, inputStyle],
    [styles.input, height, inputStyle]
  );

  return (
    <View style={containerStyles}>
      {label ? <Text style={labelStyles}>{label}</Text> : null}
      <TextInput
        testID="multiline-input"
        defaultValue={defaultValue?.toString()}
        multiline
        numberOfLines={numberOfLines}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.gray4}
        ref={inputReference}
        selectionColor={colors.primary}
        style={textInputStyles}
        textAlignVertical="center"
        {...props}
      />
    </View>
  );
};

export default React.memo(MultilineInput);
