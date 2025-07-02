import { StyleSheet } from 'react-native';
import { fontWeight, generateFontSizes } from '@/theme/fonts';
import type { FontColors } from './types/fonts';

const lineHeight = (size: number, percentage: number) => {
  return size * (percentage / 100);
};

export const typographies = (colors: FontColors) =>
  StyleSheet.create({
    heading1: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_32.fontSize,
      fontWeight: fontWeight.bold,
      textAlign: 'left',
    },
    heading2: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_24.fontSize,
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight(24, 120),
      textAlign: 'left',
    },
    heading3: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_18.fontSize,
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight(18, 120),
      textAlign: 'left',
    },
    // eslint-disable-next-line react-native/sort-styles
    body1: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_16.fontSize,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight(16, 120),
      textAlign: 'left',
    },
    body2: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_14.fontSize,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight(14, 120),
      textAlign: 'left',
    },
    body3: {
      color: colors.text.color,
      fontSize: generateFontSizes().size_12.fontSize,
      fontWeight: fontWeight.regular,
      textAlign: 'left',
    },
  });
