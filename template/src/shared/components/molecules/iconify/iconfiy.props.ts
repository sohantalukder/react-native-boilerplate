import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props interface for the Iconify component.
 * Used to render icons with customizable size, color, and styling options.
 */
export interface IconifyProps {
  /** The name/identifier of the icon to display */
  icon: string;
  /** Optional width of the icon in pixels */
  width?: number;
  /** Optional height of the icon in pixels */
  height?: number;
  /** Optional color of the icon (hex, rgb, or named color) */
  color?: string;
  /** Optional custom styling for the icon container */
  style?: StyleProp<ViewStyle>;
}
