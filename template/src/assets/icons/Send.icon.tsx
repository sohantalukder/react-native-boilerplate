import type { IconProps } from '@/types/iconProps';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from '@/theme';

const SendIcon: React.FC<IconProps> = ({
  height = 12,
  width = 12,
  fill,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      {...props}
    >
      <G fill={fill ?? colors.text}>
        <Path
          fillRule="evenodd"
          d="M1.685 6.659c-.926.309-.906 1.626.03 1.906l7.493 2.242 2.447 7.71c.293.922 1.596.932 1.902.013L18.86 2.62a1 1 0 00-1.265-1.265zm3.633.897l11.012-3.67-3.698 11.096-1.677-5.284a1 1 0 00-.667-.655z"
          clipRule="evenodd"
        />
        <Path d="M17.767 1.44l1.044 1.077-8.828 8.544-1.044-1.078z" />
      </G>
    </Svg>
  );
};

export default SendIcon;
