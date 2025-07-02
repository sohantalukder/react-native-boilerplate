import type { IconProps } from '@/types/iconProps';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/theme';

const RefreshIcon: React.FC<IconProps> = ({
  height = 20,
  width = 20,
  fill,
}) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
    >
      <Path
        fill="none"
        stroke={fill ?? colors.text}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M320 146s24.36-12-64-12a160 160 0 10160 160"
      />
      <Path
        fill="none"
        stroke={fill ?? colors.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 58l80 80-80 80"
      />
    </Svg>
  );
};

export default RefreshIcon;
