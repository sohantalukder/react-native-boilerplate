import { useTheme } from '@/theme';
import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon: React.FC<IconProps> = ({ fill, height = 16, width = 16 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={fill ?? colors.text}
        fillRule="evenodd"
        d="M2.82 1.596a39 39 0 015.469 0c.295.021.553.124.754.277a.625.625 0 00.756-.995c-.396-.3-.886-.49-1.421-.529a40 40 0 00-5.646 0C1.46.44.419 1.402.356 2.653A88 88 0 00.25 7c0 1.491.037 2.946.106 4.347.063 1.251 1.104 2.213 2.376 2.304a40 40 0 005.646 0 2.66 2.66 0 001.421-.529.625.625 0 10-.756-.995c-.201.152-.46.256-.754.277a39 39 0 01-5.468 0c-.713-.05-1.189-.568-1.216-1.119A86 86 0 011.5 7c0-1.47.036-2.905.105-4.285.027-.551.503-1.068 1.216-1.119m1.74 4.779h5.192V4.213a.625.625 0 01.907-.557c1.218.617 2.41 1.825 3.02 3.056a.62.62 0 010 .577c-.61 1.23-1.803 2.438-3.02 3.055a.625.625 0 01-.907-.557V7.625H4.56a.625.625 0 110-1.25"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default LogoutIcon;
