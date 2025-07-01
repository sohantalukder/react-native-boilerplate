import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@/theme';
import { Colors } from '@/theme/types/colors';
import rs from '@/shared/utilities/responsiveSize';
/**
 * Properties for the Card component.
 */
type Properties = Pick<ViewProps, 'children' | 'style'> & {
  borderRadius?: number;
  shadow?: boolean;
};

const Card: React.FC<Properties> = ({
  children,
  style,
  borderRadius = 2,
  shadow = true,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = stylesheet(colors, borderRadius);
  return (
    <View
      style={[styles.card, shadow && styles.shadow, StyleSheet.flatten(style)]}
      {...props}
    >
      {children}
    </View>
  );
};

const stylesheet = (colors: Colors, borderRadius: number) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.gray10,
      borderRadius,
      overflow: 'hidden',
      padding: rs(10),
      width: '100%',
    },
    shadow: {
      elevation: 5,
      shadowColor: colors.text,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });

export default Card;
