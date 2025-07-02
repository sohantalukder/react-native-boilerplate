import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/types/colors';
import type { Variant } from '@/theme/types/config';
import { fontWeight } from '@/theme/fonts';

/**
 * Input styling constants
 */
const BORDER_RADIUS = 8;
const BORDER_WIDTH = 1;
const CONTAINER_PADDING = 20;
const CONTAINER_GAP = 16;
const MULTI_LINE_GAP = 12;
const MULTI_LINE_PADDING = 5;
const INPUT_PADDING_VERTICAL = 13;
const ICON_RIGHT_POSITION = 16;
const FONT_SIZE = 16;
const INPUT_HEIGHT = 48;

/**
 * Properties required for styling the input components
 */
type Properties = {
  colors: Colors;
  variant: Variant;
};

/**
 * Generates styles for input components
 * @param props - Theme properties
 * @returns StyleSheet object with input styles
 */
export const inputStyles = ({ colors }: Properties) => {
  // Calculate shared styles to avoid duplication
  const containerBorderStyle = {
    borderColor: colors.gray7,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
  };

  return StyleSheet.create({
    activeContainer: {
      borderColor: colors.primary,
    },

    container: {
      ...containerBorderStyle,
      alignItems: 'center',
      flexDirection: 'row',
      flexShrink: 1,
      gap: CONTAINER_GAP,
      height: INPUT_HEIGHT,
      justifyContent: 'space-between',
      paddingHorizontal: CONTAINER_PADDING,
    },

    errorContainer: {
      borderColor: colors.error,
    },

    input: {
      color: colors.text,
      flex: 1,
      fontSize: FONT_SIZE,
      fontWeight: fontWeight.semibold,
      paddingVertical: INPUT_PADDING_VERTICAL,
    },

    leftIcon: {
      position: 'absolute',
      right: ICON_RIGHT_POSITION,
    },

    multiLineContainer: {
      ...containerBorderStyle,
      flexDirection: 'row',
      gap: MULTI_LINE_GAP,
      paddingHorizontal: MULTI_LINE_PADDING,
    },
    phoneInput: {
      color: colors.text,
      fontSize: FONT_SIZE,
      fontWeight: fontWeight.semibold,
    },
  });
};
