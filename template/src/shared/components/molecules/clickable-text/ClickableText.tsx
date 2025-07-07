import { Ripple, Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import type { StyleProp, ViewStyle, TextStyle, TextProps } from 'react-native';
import { View } from 'react-native';
import type { TextColor } from '@/shared/components/atoms/text/Text';
import type { TypographySize } from '@/theme/types/fonts';

type Properties = TextProps & {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textColor?: TextColor;
  variant?: TypographySize;
  textStyle?: StyleProp<TextStyle>;
};

const ClickableText: React.FC<Properties> = ({
  onPress = () => {},
  style,
  textColor = 'default',
  variant = 'body3',
  textStyle,
  children,
}) => {
  const { layout, gutters } = useTheme();

  return (
    <Ripple onPress={onPress}>
      <View style={[layout.itemsCenter, gutters.padding_4, style]}>
        <Text
          variant={variant}
          color={textColor}
          weight="semibold"
          style={textStyle}
        >
          {children}
        </Text>
      </View>
    </Ripple>
  );
};

export default ClickableText;
