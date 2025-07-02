import type { Backgrounds } from './backgrounds';
import type { Borders } from './borders';
import type { Variant } from './config';
import type { Fonts } from './fonts';
import type { Gutters } from './gutters';
import type layout from '@/theme/layout';
import type { Colors } from '@/theme/types/colors';
import type { Theme as NavigationTheme } from '@react-navigation/native';
import type { Typographies } from './typographies';

export type ComponentTheme = Omit<Theme, 'components' | 'navigationTheme'>;

export type Theme = {
  backgrounds: Backgrounds;
  borders: Borders;
  colors: Colors;
  fonts: Fonts;
  gutters: Gutters;
  layout: typeof layout;
  navigationTheme: NavigationTheme;
  typographies: Typographies;
  variant: Variant;
  logo: number;
};
