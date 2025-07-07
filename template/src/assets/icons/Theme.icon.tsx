import { useTheme } from '@/theme';
import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
    >
      <Path
        fill={fill ?? colors.text}
        d="M2 8a6 6 0 1112 0c0 1.58-.328 3.05-.983 4.146C12.354 13.254 11.334 14 10 14a3 3 0 01-3-3v-1a1 1 0 00-1-1c-.28 0-.402.109-.646.354l-.014.013C5.085 9.622 4.708 10 4 10a2 2 0 01-2-2m5.5-2.5a.5.5 0 100-1 .5.5 0 000 1m2.5 0a.5.5 0 10-1 0 .5.5 0 001 0M11.5 7a.5.5 0 10-1 0 .5.5 0 001 0M11 9.5a.5.5 0 100-1 .5.5 0 000 1m-.5 1.5a.5.5 0 10-1 0 .5.5 0 001 0"
      />
    </Svg>
  );
};

export default CheckIcon;
