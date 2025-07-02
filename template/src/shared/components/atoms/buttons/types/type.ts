import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Button variant types that determine the visual style and behavior
 */
export type ButtonVariant =
  | 'disable'
  | 'error'
  | 'outline'
  | 'primary'
  | 'secondary';

/**
 * Position of the icon relative to the button text
 */
type IconPosition = 'left' | 'right';

/**
 * Props for the main Button component
 * @property title - The text content of the button
 * @property variant - The visual style variant of the button
 * @property bgColor - Background color of the button
 * @property textColor - Color of the button text
 * @property icon - Optional icon element to display
 * @property iconPosition - Position of the icon relative to text
 * @property isLoading - Whether to show loading state
 * @property disabled - Whether the button is disabled
 * @property onPress - Callback function when button is pressed
 * @property wrapStyle - Custom styles for the button container
 * @property textStyle - Custom styles for the button text
 * @property borderRadius - Border radius of the button
 * @property rippleColor - Color of the ripple effect
 * @property activityColor - Color of the loading indicator
 * @property tooltip - Tooltip text for the button
 */
type ButtonProps = {
  // Required props
  text: string;
  variant?: ButtonVariant;

  // Colors
  activityColor?: ColorValue;
  bgColor?: ColorValue;
  rippleColor?: ColorValue;
  textColor?: ColorValue;

  // Icon related
  icon?: string | React.ReactNode;
  iconColor?: ColorValue;
  iconPosition?: IconPosition;

  // State
  disabled?: boolean;
  isLoading?: boolean;

  // Callbacks
  onPress?: () => void;

  // Styles
  borderRadius?: number;
  textStyle?: StyleProp<TextStyle>;
  wrapStyle?: StyleProp<ViewStyle>;
};

/**
 * Props for the IconButton component
 * @property icon - The icon element to display
 * @property onPress - Callback function when button is pressed
 * @property bgColor - Background color of the button
 * @property borderColor - Color of the button border
 * @property style - Custom styles for the button
 * @property disabled - Whether the button is disabled
 * @property rippleColor - Color of the ripple effect
 * @property borderRadius - Border radius of the button
 */
type IconButtonProps = {
  // Required props
  icon: string | React.ReactNode;

  // Colors
  bgColor?: ColorValue;
  borderColor?: ColorValue;
  rippleColor?: ColorValue;
  iconColor?: ColorValue;

  // State
  disabled?: boolean;

  // Callbacks
  onPress?: () => void;

  // Styles
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;

  // Size
  size?: 'small' | 'medium' | 'large';
  iconSize?: number;
};

/**
 * Props for the RippleButton component
 * @property children - Child elements to render inside the button
 * @property onPress - Callback function when button is pressed
 * @property rippleScale - Scale factor for the ripple effect
 * @property duration - Duration of the ripple animation in milliseconds
 * @property overflow - Whether the ripple effect should overflow the button bounds
 * @property rippleColor - Color of the ripple effect
 * @property rippleOpacity - Opacity of the ripple effect
 * @property disabled - Whether the button is disabled
 * @property haptic - Whether to provide haptic feedback
 * @property style - Custom styles for the button
 * @property borderRadius - Border radius of the button
 */
type RippleButtonProps = {
  // Required props
  children: React.ReactNode;

  // Ripple effect properties
  duration?: number;
  overflow?: boolean;
  rippleColor?: ColorValue;
  rippleOpacity?: number;
  rippleScale?: number;

  // State
  disabled?: boolean;
  haptic?: boolean;

  // Callbacks
  onPress?: () => void;

  // Styles
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;

  // Test ID
  testID?: string;
};

export type { ButtonProps, IconButtonProps, IconPosition, RippleButtonProps };
