import { useTheme } from '@/theme';
import type { IconProps } from '@/types/iconProps';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NotificationIcon: React.FC<IconProps> = ({
  height = 24,
  width = 24,
  fill,
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
        d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 01-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 00.693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
        opacity={0.5}
      />
      <Path
        fill={fill ?? colors.text}
        d="M12.75 6a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0zM7.243 18.545a5.002 5.002 0 009.513 0c-3.145.59-6.367.59-9.513 0"
      />
    </Svg>
  );
};

export default NotificationIcon;
