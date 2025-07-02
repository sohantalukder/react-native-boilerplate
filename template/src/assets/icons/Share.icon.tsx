import type { IconProps } from '@/types/iconProps';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/theme';

const ShareIcon: React.FC<IconProps> = ({ height = 24, width = 24, fill }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fill={fill ?? colors.text}
        d="M19.59 12L15 7.41v2.46l-.86.13c-4.31.61-7.23 2.87-8.9 6.33 2.32-1.64 5.2-2.43 8.76-2.43h1v2.69m-2-1.69v.02c-4.47.21-7.67 1.82-10 5.08 1-5 4-10 11-11V5l7 7-7 7v-4.1c-.33 0-.66.01-1 .02z"
      />
    </Svg>
  );
};

export default ShareIcon;
