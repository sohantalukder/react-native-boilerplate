import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/types/colors';
import rs from '@/shared/utilities/responsiveSize';

interface MultiSelectStylesProps {
  colors: Colors;
}

export const multiSelectStyles = ({ colors }: MultiSelectStylesProps) =>
  StyleSheet.create({
    activeContainer: {
      borderColor: colors.primary,
    },
    arrow: {
      marginLeft: rs(8),
    },
    container: {
      width: '100%',
    },
    disabled: {
      backgroundColor: colors.gray1,
      opacity: 0.5,
    },
    error: {
      borderColor: colors.error,
    },
    errorContainer: {
      borderColor: colors.error,
    },
    select: {
      alignItems: 'center',
      backgroundColor: colors.background,
      borderColor: colors.gray7,
      borderRadius: rs(8),
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 48,
      paddingHorizontal: rs(20),
      paddingVertical: rs(8),
    },
  });
