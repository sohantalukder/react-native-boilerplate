import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@/theme';
import withOpacity from '@/shared/utilities/withOpacity';

const PlaceholderImage: React.FC<ViewProps> = ({ style }) => {
  const { colors, layout } = useTheme();
  return (
    <View
      style={[
        layout.fullWidth,
        layout.fullHeight,
        layout.justifyCenter,
        layout.itemsCenter,
        { backgroundColor: withOpacity(colors.text, 0.2) },
        style,
      ]}
    >
      <Svg
        width={'45%'}
        height={'45%'}
        viewBox="0 0 16 16"
        fill="none"
      >
        <Path
          fill={withOpacity(colors.text, 0.6)}
          d="M.002 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-12a2 2 0 01-2-2zm1 9v1a1 1 0 001 1h12a1 1 0 001-1V9.5l-3.777-1.947a.5.5 0 00-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 00-.63.062zm5-6.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0"
        />
      </Svg>
    </View>
  );
};
export default PlaceholderImage;
