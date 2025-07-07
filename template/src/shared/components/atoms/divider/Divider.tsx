import type { ViewProps, DimensionValue, ColorValue } from 'react-native';
import { View, StyleSheet } from 'react-native';
import type { Colors } from '@/theme/types/colors';
import { useTheme } from '@/theme';

type Properties = ViewProps & {
  color?: ColorValue;
  width?: DimensionValue;
  height?: DimensionValue;
};

const Divider = ({ color, style, width = '100%', height = 1 }: Properties) => {
  const { colors } = useTheme();
  const styles = stylesheet(colors, width, height, color);
  return <View style={[styles.divider, style]} />;
};

export default Divider;

const stylesheet = (
  colors: Colors,
  width: DimensionValue,
  height: DimensionValue,
  color?: ColorValue
) =>
  StyleSheet.create({
    divider: {
      backgroundColor: color ?? colors.gray7,
      height,
      width,
    },
  });
