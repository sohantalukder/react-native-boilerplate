import { useTheme } from '@/theme';
import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteIcon: React.FC<IconProps> = ({ fill, height = 20, width = 20 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        fill={fill ?? colors.text}
        d="M5 3h2a1 1 0 00-2 0M4 3a2 2 0 114 0h2.5a.5.5 0 010 1h-.441l-.443 5.17A2 2 0 017.623 11H4.377a2 2 0 01-1.993-1.83L1.941 4H1.5a.5.5 0 010-1zm3.5 3a.5.5 0 00-1 0v2a.5.5 0 001 0zM5 5.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0V6a.5.5 0 01.5-.5M3.38 9.085a1 1 0 00.997.915h3.246a1 1 0 00.996-.915L9.055 4h-6.11z"
      />
    </Svg>
  );
};

export default DeleteIcon;
