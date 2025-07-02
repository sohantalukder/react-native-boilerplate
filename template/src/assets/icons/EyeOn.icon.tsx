import type { IconProps } from '@/types/iconProps';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/theme';

const EyeOnIcon: React.FC<IconProps> = ({ fill, height = 24, width = 24 }) => {
  const { colors } = useTheme();
  return (
    <Svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <Path
        clipRule="evenodd"
        d="M11.9999 9.32C10.5169 9.32 9.31988 10.5171 9.31988 12C9.31988 13.4829 10.5169 14.68 11.9999 14.68C13.4828 14.68 14.6799 13.4829 14.6799 12C14.6799 10.5171 13.4828 9.32 11.9999 9.32ZM7.51988 12C7.51988 9.52294 9.52282 7.52 11.9999 7.52C14.4769 7.52 16.4799 9.52294 16.4799 12C16.4799 14.4771 14.4769 16.48 11.9999 16.48C9.52282 16.48 7.51988 14.4771 7.51988 12Z"
        fill={fill ?? colors.text}
        fillOpacity={1}
        fillRule="evenodd"
      />
      <Path
        clipRule="evenodd"
        d="M18.1544 16.6032C20.1154 14.9776 21.0999 13.1864 21.0999 12C21.0999 10.8136 20.1154 9.02238 18.1544 7.39684C16.2525 5.82031 13.8952 4.8 11.8999 4.8C9.90464 4.8 7.54735 5.82031 5.64545 7.39684C3.68442 9.02238 2.6999 10.8136 2.6999 12C2.6999 13.1864 3.68442 14.9776 5.64545 16.6032C7.54735 18.1797 9.90464 19.2 11.8999 19.2C13.8952 19.2 16.2525 18.1797 18.1544 16.6032ZM11.8999 21C16.975 21 22.8999 15.9706 22.8999 12C22.8999 8.02944 16.975 3 11.8999 3C6.82477 3 0.899902 8.02944 0.899902 12C0.899902 15.9706 6.82477 21 11.8999 21Z"
        fill={fill ?? colors.text}
        fillOpacity={1}
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default EyeOnIcon;
