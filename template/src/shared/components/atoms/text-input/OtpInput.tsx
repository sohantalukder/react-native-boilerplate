import React, { useCallback, useMemo, useRef, useState } from 'react';
import type {
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import { TextInput, View } from 'react-native';

import { useTheme } from '@/theme';

import { otpStyles } from './styles/otp.styles';

type OTPInputProps = {
  readonly callback?: (parameters: string) => void;
  readonly length?: number;
  readonly style?: StyleProp<ViewStyle>;
};

const OTPInput: React.FC<OTPInputProps> = ({ callback, length = 6, style }) => {
  const { colors, gutters, typographies } = useTheme();
  const inputReferences = useRef<(null | TextInput)[]>([]);
  // Track focused state for styling
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);
  // Use state to track OTP values for better reactivity
  // Using new Array() instead of Array() to satisfy the unicorn/new-for-builtins rule
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(length).fill('')
  );

  const componentStyles = useMemo(
    () => otpStyles(colors, gutters, typographies),
    [colors, gutters, typographies]
  );

  // Get the complete OTP value
  const getOtpValue = useCallback(() => otpValues.join(''), [otpValues]);

  // Check if OTP is complete and call the callback
  const checkCompletion = useCallback(() => {
    const otpValue = getOtpValue();
    if (otpValue.length === length) {
      callback?.(otpValue);
    }
  }, [callback, getOtpValue, length]);

  // Update a specific position in the OTP array
  const updateOtpValue = useCallback((index: number, value: string) => {
    setOtpValues((previous) => {
      const newValues = [...previous];
      newValues[index] = value;
      return newValues;
    });
  }, []);

  const handleOnFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleOnBlur = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  const handleBackspace = useCallback(
    (index: number) => {
      // If current input is empty and not the first input, move to previous
      if (otpValues[index] === '' && index > 0) {
        updateOtpValue(index - 1, '');
        inputReferences.current[index - 1]?.focus();
      } else {
        // Clear current input
        updateOtpValue(index, '');
      }
    },
    [otpValues, updateOtpValue]
  );

  const handleKeyPress = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      const { key } = event.nativeEvent;
      if (key === 'Backspace') {
        handleBackspace(index);
      }
    },
    [handleBackspace]
  );

  const handlePaste = useCallback(
    (text: string, currentIndex: number) => {
      // Clean the pasted text to only include numbers
      const cleanText = text.replaceAll(/\D/g, '');

      // Create a new array with the pasted values
      const newValues = [...otpValues];

      // Update OTP values with pasted digits
      for (
        let index = 0;
        index < Math.min(cleanText.length, length - currentIndex);
        index++
      ) {
        const targetIndex = currentIndex + index;
        newValues[targetIndex] = cleanText[index] ?? '';
      }

      setOtpValues(newValues);

      // Focus the next empty input or the last input
      const nextFocusIndex = Math.min(
        currentIndex + cleanText.length,
        length - 1
      );
      setTimeout(() => {
        inputReferences.current[nextFocusIndex]?.focus();
      }, 0);

      // Check completion
      setTimeout(checkCompletion, 50);
    },
    [length, otpValues, checkCompletion]
  );

  const handleTextChange = useCallback(
    (text: string, index: number) => {
      // Handle backspace through text change
      if (text === '') {
        handleBackspace(index);
        return;
      }

      // Handle paste operation
      if (text.length > 1) {
        handlePaste(text, index);
        return;
      }

      // Update the OTP value
      updateOtpValue(index, text);

      // Move to next input if available
      if (text && index < length - 1) {
        inputReferences.current[index + 1]?.focus();
      } else if (index === length - 1 && text) {
        // Check completion for last input
        checkCompletion();
        inputReferences.current[index]?.blur();
      }
    },
    [handleBackspace, handlePaste, updateOtpValue, length, checkCompletion]
  );

  // Create and memoize the input fields
  const renderInputs = useMemo(() => {
    // Using new Array() instead of Array.from to satisfy the unicorn/new-for-builtins rule
    return new Array(length).fill(null).map((_, index) => (
      <TextInput
        autoComplete="one-time-code"
        inputMode="numeric"
        key={index}
        keyboardType="number-pad"
        maxLength={1}
        onBlur={handleOnBlur}
        onChangeText={(text) => {
          handleTextChange(text, index);
        }}
        onFocus={() => {
          handleOnFocus(index);
        }}
        onKeyPress={(e) => {
          handleKeyPress(e, index);
        }}
        placeholder="0"
        placeholderTextColor={colors.gray7}
        ref={(element) => {
          inputReferences.current[index] = element;
        }}
        selectionColor={colors.primary}
        selectTextOnFocus
        style={[
          componentStyles.input,
          focusedIndex === index && componentStyles.focus,
        ]}
        textAlignVertical="center"
        value={otpValues[index]}
      />
    ));
  }, [
    componentStyles.input,
    componentStyles.focus,
    focusedIndex,
    colors.gray7,
    colors.primary,
    handleOnFocus,
    handleOnBlur,
    handleKeyPress,
    handleTextChange,
    length,
    otpValues,
  ]);

  return (
    <View
      testID="otp-input"
      style={[componentStyles.container, style]}
    >
      {renderInputs}
    </View>
  );
};

export default OTPInput;
