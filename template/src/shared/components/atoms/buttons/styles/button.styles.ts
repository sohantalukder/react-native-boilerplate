import { StyleSheet } from 'react-native';
import type { ColorValue } from 'react-native';
import type { Colors } from '@/theme/types/colors';
import hexToRgbA from '@/shared/utilities/hexaToRgba';
const config = {
  buttonHeight: 48,
  iconButtonSizeLarge: 40,
  iconButtonSizeMedium: 32,
  iconButtonSizeSmall: 20,
};

export const buttonStyles = ({
  borderRadius,
  bgColor,
  colors,
}: {
  borderRadius: number;
  bgColor?: ColorValue;
  colors: Colors;
}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: bgColor ?? colors.primary,
      borderRadius,
      flexDirection: 'row',
      flexShrink: 1,
      height: config.buttonHeight,
      justifyContent: 'center',
      width: '100%',
    },
    disable: {
      backgroundColor: bgColor ?? colors.gray9,
      color: colors.gray6,
    },
    error: {
      backgroundColor: bgColor ?? colors.error,
      color: colors.white,
    },
    iconGap: { alignItems: 'center', flexDirection: 'row', gap: 10 },
    outline: {
      backgroundColor: colors.transparent,
      borderColor: bgColor ?? colors.gray7,
      borderWidth: 1,
      color: colors.text,
    },
    primary: {
      backgroundColor: bgColor ?? colors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: bgColor ?? colors.background,
      color: colors.gray0,
    },
  });

export const iconButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    minWidth: 0,
    padding: 0,
  },
  large: {
    height: config.iconButtonSizeLarge,
    width: config.iconButtonSizeLarge,
  },
  medium: {
    height: config.iconButtonSizeMedium,
    width: config.iconButtonSizeMedium,
  },
  small: {
    height: config.iconButtonSizeSmall,
    width: config.iconButtonSizeSmall,
  },
});

export const createRippleStyles = (
  rippleColor: ColorValue,
  radius: number,
  rippleOpacity: number,
  borderRadius: number,
  overflow?: boolean
) =>
  StyleSheet.create({
    button: {
      backgroundColor: hexToRgbA(rippleColor, rippleOpacity),
      borderRadius: radius,
      height: radius * 2,
      position: 'absolute',
      width: radius * 2,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      borderRadius,
      overflow: !overflow ? 'hidden' : undefined,
    },
  });
