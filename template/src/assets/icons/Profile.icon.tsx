import { useTheme } from '@/theme';
import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon: React.FC<IconProps> = ({
  fill,
  height = 20,
  width = 20,
}) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={fill ?? colors.text}
        fillRule="evenodd"
        d="M8 7a4 4 0 118 0 4 4 0 01-8 0m0 6a5 5 0 00-5 5 3 3 0 003 3h12a3 3 0 003-3 5 5 0 00-5-5z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default ProfileIcon;
