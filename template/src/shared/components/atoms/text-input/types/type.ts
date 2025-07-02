import type React from 'react';
import type {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { z } from 'zod';

// Validation rule types
export type ValidationRule = ValidationRuleKey | z.ZodType;
export type ValidationRuleKey = 'email' | 'number' | 'password' | 'required';

// Base interface for common input properties
type BaseInputProps = {
  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Callback function when text changes
   * @param value The current text value
   * @param name The field name (if provided)
   * @param isValid Whether the input passes validation
   */
  onChangeText?: (value: string, name?: string, isValid?: boolean) => void;

  /**
   * Default value for the input
   */
  defaultValue?: string;

  /**
   * Current value for controlled inputs
   */
  value?: string;

  /**
   * Field name identifier for form handling
   */
  name?: string;

  /**
   * Validation rules - can be a predefined key or a Zod schema
   */
  validationRules?: ValidationRule;

  /**
   * Additional props to pass to the TextInput component
   */
  inputProps?: TextInputProps;

  /**
   * Whether the input is editable
   */
  editable?: boolean;

  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;

  /**
   * Callback when the submit button is pressed
   */
  onSubmitEditing?: () => void;

  /**
   * Return key type for the keyboard
   */
  returnKeyType?: TextInputProps['returnKeyType'];

  /**
   * Keyboard type for the input
   */
  keyboardType?: KeyboardTypeOptions;
};

/**
 * Props for the CustomTextInput component
 */
export type CustomInputProps = TextInputProps & {
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;

  /**
   * Callback function when the right icon is pressed
   */
  rightHandler?: () => void;

  /**
   * Style for the input container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style for the wrapper around the input
   */
  wrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Label text to display above the input
   */
  label?: string;

  /**
   * Style for the label text
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Error message to display (for controlled error handling)
   */
  errorMessage?: string;

  /**
   * Whether the input is currently disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is required
   */
  required?: boolean;
} & BaseInputProps;

/**
 * Props for the MultilineInput component
 */
export type MultilineInputProps = {
  /**
   * Number of lines to display for multiline input
   */
  numberOfLines?: number;

  /**
   * Height of the input field
   */
  height?: number;

  /**
   * Vertical alignment of text within the input
   */
  textAlignVertical?: TextInputProps['textAlignVertical'];

  /**
   * Style for the container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the input itself
   */
  inputStyle?: StyleProp<ViewStyle>;

  /**
   * Label text to display above the input
   */
  label?: number | string;

  /**
   * Style for the label text
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Color for the label text
   */
  labelColor?: string;

  /**
   * Alternative callback for value changes
   */
  onChangeValue?: (text: string, name: string) => void;
} & BaseInputProps;

/**
 * Props for the PasswordInput component
 */
export type PasswordInputProps = {
  /**
   * Style for the input container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style for the wrapper around the input
   */
  wrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Border color for the input
   */
  borderColor?: string;

  /**
   * Background color for the input
   */
  bgColor?: string;

  /**
   * Reference to the TextInput element
   */
  inputRef?: React.RefObject<TextInput>;

  /**
   * Label text to display above the input
   */
  label?: string;

  /**
   * Style for the label text
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;
} & BaseInputProps;
