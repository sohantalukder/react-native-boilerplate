import React from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View, Pressable } from 'react-native';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import rs from '@/shared/utilities/responsiveSize';

/**
 * Card variants for different use cases
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/**
 * Elevation levels for shadow depth
 */
export type CardElevation = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Properties for the Card component.
 */
export type CardProps = Pick<ViewProps, 'children' | 'style' | 'testID'> & {
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Border radius of the card
   * @default 12
   */
  borderRadius?: number;

  /**
   * Shadow elevation level (0-5)
   * @default 2
   */
  elevation?: CardElevation;

  /**
   * Whether to show shadow
   * @default true
   */
  shadow?: boolean;

  /**
   * Custom padding inside the card
   * @default 16
   */
  padding?: number;

  /**
   * Custom margin around the card
   * @default 0
   */
  margin?: number;

  /**
   * Background color override
   */
  backgroundColor?: string;

  /**
   * Border color for outlined variant
   */
  borderColor?: string;

  /**
   * Border width for outlined variant
   * @default 1
   */
  borderWidth?: number;

  /**
   * Custom width
   */
  width?: ViewStyle['width'];

  /**
   * Custom height
   */
  height?: ViewStyle['height'];

  /**
   * Whether the card is pressable (adds subtle pressed state)
   * @default false
   */
  pressable?: boolean;

  /**
   * Callback when card is pressed (only if pressable is true)
   */
  onPress?: () => void;
};

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  borderRadius = 12,
  elevation = 2,
  shadow = true,
  padding = 16,
  margin = 0,
  backgroundColor,
  borderColor,
  borderWidth = 1,
  width,
  height,
  pressable = false,
  onPress,
  testID,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, {
    variant,
    borderRadius,
    elevation,
    shadow,
    padding,
    margin,
    backgroundColor,
    borderColor,
    borderWidth,
    width,
    height,
  });

  const cardStyle = [
    styles.card,
    styles[variant],
    shadow && styles.shadow,
    StyleSheet.flatten(style),
  ];

  if (pressable && onPress) {
    return (
      <Pressable
        style={cardStyle}
        onPress={onPress}
        testID={testID}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={cardStyle}
      testID={testID}
      {...props}
    >
      {children}
    </View>
  );
};

interface StyleOptions {
  variant: CardVariant;
  borderRadius: number;
  elevation: CardElevation;
  shadow: boolean;
  padding: number;
  margin: number;
  backgroundColor?: string | undefined;
  borderColor?: string | undefined;
  borderWidth: number;
  width?: ViewStyle['width'] | undefined;
  height?: ViewStyle['height'] | undefined;
}

const createStyles = (colors: Colors, options: StyleOptions) => {
  const {
    borderRadius,
    elevation,
    padding,
    margin,
    backgroundColor,
    borderColor,
    borderWidth,
    width,
    height,
  } = options;

  // Elevation to shadow mapping
  const elevationShadows: Record<CardElevation, ViewStyle> = {
    0: {},
    1: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },
    2: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    3: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    4: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    5: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
  };

  return StyleSheet.create({
    card: {
      borderRadius: rs(borderRadius),
      height,
      margin: rs(margin),
      overflow: 'hidden',
      padding: rs(padding),
      width,
    },
    default: {
      backgroundColor: backgroundColor || colors.background,
    },
    elevated: {
      backgroundColor: backgroundColor || colors.background,
    },
    filled: {
      backgroundColor: backgroundColor || colors.gray9,
    },
    outlined: {
      backgroundColor: backgroundColor || colors.background,
      borderColor: borderColor || colors.gray7,
      borderWidth: rs(borderWidth),
    },
    shadow: elevationShadows[elevation],
  });
};

export default Card;
