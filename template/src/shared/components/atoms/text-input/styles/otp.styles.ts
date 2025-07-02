import rs from '@/shared/utilities/responsiveSize';
import withOpacity from '@/shared/utilities/withOpacity';
import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/types/colors';
import type { Gutters } from '@/theme/types/gutters';
import type { Typographies } from '@/theme/types/typographies';

// Define constants to avoid magic numbers
const INPUT_DIMENSIONS = {
  BORDER_RADIUS: 15,
  BORDER_WIDTH: 1,
  GAP: 9,
  HEIGHT: 55,
  WIDTH: 42,
};

const CONTAINER_GAP = 12;

/**
 * Styles for the OTP input component
 * @param {Colors} colors - Theme colors
 * @param {Gutters} gutters - Theme gutters
 * @param {Typographies} typographies - Theme typographies
 * @returns {StyleSheet.NamedStyles} - StyleSheet object
 */
export const otpStyles = (
  colors: Colors,
  gutters: Gutters,
  typographies: Typographies
) => {
  // Memoize common style properties
  const inputBorderStyle = {
    borderColor: colors.gray6,
    borderWidth: INPUT_DIMENSIONS.BORDER_WIDTH,
  };

  const inputSizeStyle = {
    borderRadius: rs(INPUT_DIMENSIONS.BORDER_RADIUS),
    height: rs(INPUT_DIMENSIONS.HEIGHT),
    width: rs(INPUT_DIMENSIONS.WIDTH),
  };

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      gap: CONTAINER_GAP,
      justifyContent: 'space-between',
      maxWidth: rs(400),
    },
    focus: {
      backgroundColor: withOpacity(colors.primary, 0.1),
      borderColor: colors.primary,
    },
    input: {
      ...inputSizeStyle,
      ...inputBorderStyle,
      ...typographies.heading1,
      ...gutters.paddingVertical_6,
      ...gutters.paddingHorizontal_10,
      backgroundColor: colors.transparent,
      gap: INPUT_DIMENSIONS.GAP,
      justifyContent: 'center',
      textAlign: 'center',
    },
  });
};
