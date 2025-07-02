import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { useTheme } from '@/theme';
import type { TypographySize } from '@/theme/types/fonts';
import { fontWeight } from '@/theme/fonts';
import withOpacity from '@/shared/utilities/withOpacity';
export type TextColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'disabled'
  | 'black'
  | 'white';

type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Props for the Text component.
 * @see TextProps
 */
type PropsWithChildren = TextProps & {
  /**
   * Variant of the text.
   * @default 'body1'
   */
  variant?: TypographySize;
  /**
   * Color of the text.
   * @default 'default'
   */
  color?: TextColor;
  /**
   * Weight of the text.
   * @default 'normal'
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
};

const Text: React.FC<PropsWithChildren> = ({
  color = 'default',
  variant = 'body1',
  weight = 'regular',
  style,
  ...props
}) => {
  const { fonts, typographies } = useTheme();

  // Map color prop to actual color value
  const colorMap: Record<TextColor, string> = {
    default: fonts.text.color,
    primary: fonts.primary.color,
    secondary: fonts.gray1.color,
    success: fonts.success.color,
    warning: fonts.warning.color,
    error: fonts.error.color,
    disabled: withOpacity(fonts.text.color, 0.5),
    black: fonts.black.color,
    white: fonts.white.color,
  };

  // Map weight prop to actual font weight value s
  const weightMap: Record<TextWeight, TextStyle['fontWeight']> = {
    regular: fontWeight.regular,
    medium: fontWeight.medium,
    semibold: fontWeight.semibold,
    bold: fontWeight.bold,
  };

  // Map variant prop to actual typography style
  const variantStyle =
    typographies[variant as keyof typeof typographies] || typographies.body1;

  return (
    <RNText
      style={[
        variantStyle,
        { color: colorMap[color] },
        { fontWeight: weightMap[weight] },
        style,
      ]}
      {...props}
    />
  );
};

export default Text;
