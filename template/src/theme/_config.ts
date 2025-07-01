import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
  LIGHT = 'light',
}

const colorsLight = {
  background: '#FAFAFB',
  error: '#FF5630',
  gray0: '#1B1D20',
  gray1: '#323436',
  gray10: '#FAFAFA',
  gray2: '#494A4D',
  gray3: '#5F6163',
  gray4: '#767779',
  gray5: '#98999B',
  gray6: '#AFB0B1',
  gray7: '#DDDDDE',
  gray8: '#E8E8E9',
  gray9: '#F4F4F4',
  info: '#00B8D9',
  placeholder: '#FFFFFF',
  placeholderBg: '#DDDDDE',
  primary: '#4E4DD7',
  purple: '#8A2BE2',
  ripple: '#000000',
  secondary: '#00CCCC',
  severity_high: '#FF5630',
  severity_low: '#00B8D9',
  severity_major: '#FF5630',
  severity_medium: '#FFAB00',
  severity_undefined: '#00B8D9',
  skeleton: '#A1A1A1',
  success: '#22C55E',
  text: '#1B1D20',
  transparent: 'transparent',
  warning: '#FFAB00',
  white: '#FFFFFF',
  black: '#000000',
} as const;

const colorsDark = {
  background: '#080402',
  error: '#FF5630',
  gray0: '#F4F4F4',
  gray1: '#DDDDDE',
  gray10: '#1F222A',
  gray2: '#B0B1B2',
  gray3: '#9A9B9D',
  gray4: '#7C7D7F',
  gray5: '#616263',
  gray6: '#4A4B4D',
  gray7: '#373839',
  gray8: '#2C2D2F',
  gray9: '#131415',
  info: '#00B8D9',
  placeholder: '#000000',
  placeholderBg: '#2C2D2F',
  primary: '#4E4DD7',
  purple: '#8A2BE2',
  ripple: '#FFFFFF',
  secondary: '#00CCCC',
  severity_high: '#FF5630',
  severity_low: '#00B8D9',
  severity_major: '#FF5630',
  severity_medium: '#FFAB00',
  severity_undefined: '#00B8D9',
  skeleton: '#303030',
  success: '#22C55E',
  text: '#FFFFFF',
  transparent: 'transparent',
  warning: '#FFAB00',
  white: '#FFFFFF',
  black: '#000000',
} as const;

const sizes = [
  0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 80,
] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [0, 4, 8, 10, 12, 16, 24, 32, 40, 48, 80, 100],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.background,
    card: colorsLight.background,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.background,
        card: colorsDark.background,
      },
    },
  },
} as const satisfies ThemeConfiguration;
