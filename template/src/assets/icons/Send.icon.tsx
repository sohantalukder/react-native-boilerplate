import { IconProps } from '@/types/iconProps';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
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
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={fill ?? colors.purple}
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5"
      />
    </Svg>
  );
};

export default SendIcon;
