import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/theme';

const LeftArrowIcon: React.FC<IconProps> = ({
  fill,
  height = 24,
  width = 24,
}) => {
  const { colors } = useTheme();
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <Path
        d="M15.5 19l-7-7 7-7"
        stroke={fill ?? colors.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
};
export default LeftArrowIcon;
