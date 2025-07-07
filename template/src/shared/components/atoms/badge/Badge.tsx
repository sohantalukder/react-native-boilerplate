import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@/theme';
import { Ripple, Text } from '@/shared/components/atoms';
import { staticFontStyles } from '@/theme/fonts';

interface Properties {
  /**
   * The text to display in the badge
   */
  text: string;
  /**
   * The size of the badge
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The style of the badge
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The style of the text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * The color of the text
   */
  textColor?: string;
  /**
   * The background color of the badge
   */
  bgColor?: string;
  /**
   * The onPress of the badge
   */
  onPress?: () => void;
  /**
   * The disabled of the badge
   */
  disabled?: boolean;
}

const Badge: React.FC<Properties> = ({
  text,
  size = 'medium',
  style,
  textStyle,
  textColor,
  bgColor,
  onPress = () => {},
  disabled = false,
}) => {
  const { colors, gutters, borders } = useTheme();
  const paddingHorizontal = {
    small: gutters.paddingHorizontal_12,
    medium: gutters.paddingHorizontal_16,
    large: gutters.paddingHorizontal_20,
  };
  const paddingVertical = {
    small: gutters.paddingVertical_4,
    medium: gutters.paddingVertical_6,
    large: gutters.paddingVertical_8,
  };
  return (
    <Ripple
      onPress={onPress}
      disabled={disabled}
      borderRadius={16}
    >
      <View
        style={[
          {
            backgroundColor: bgColor ?? colors.transparent,
            borderColor: colors.primary,
          },
          borders.rounded_16,
          borders.w_1,
          paddingHorizontal[size],
          paddingVertical[size],
          style,
        ]}
      >
        <Text
          variant="body3"
          color="secondary"
          weight="medium"
          style={[
            {
              color: textColor
                ? textColor
                : bgColor
                  ? colors.white
                  : colors.text,
            },
            staticFontStyles.alignCenter,
            textStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </Ripple>
  );
};

export default Badge;
