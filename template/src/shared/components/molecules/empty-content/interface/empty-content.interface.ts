import type { ViewStyle, TextStyle } from 'react-native';

export type EmptyContentProps = {
  style?: ViewStyle;
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
  titleVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
  titleStyle?: TextStyle;
} & ViewStyle;
