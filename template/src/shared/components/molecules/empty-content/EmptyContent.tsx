import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import React from 'react';

import { Text, IconByVariant, Loader } from '@/shared/components/atoms';
import type { TextColor } from '@/shared/components/atoms/text/Text';
import type { TypographySize } from '@/theme/types/fonts';
import { useTheme } from '@/theme';
import { staticFontStyles } from '@/theme/fonts';

/**
 * Properties for the EmptyContent component
 */
type Properties = {
  /**
   * The description of the empty content
   */
  readonly description?: string;
  /**
   * The icon of the empty content
   */
  readonly icon?: string | React.ReactNode;
  /**
   * The title of the empty content
   */
  readonly title?: string;
  /**
   * The variant of the title
   */
  readonly titleVariant?: TypographySize;
  /**
   * The variant of the description
   */
  readonly descriptionVariant?: TypographySize;
  /**
   * The color of the title
   */
  readonly titleColor?: TextColor;
  /**
   * The color of the description
   */
  readonly descriptionColor?: TextColor;
  /**
   * The loading state of the empty content
   */
  readonly isLoading?: boolean;
  /**
   * The style of the empty content
   */
  readonly style?: StyleProp<ViewStyle>;
};

const EmptyContent: React.FC<Properties> = ({
  description,
  icon = 'emptyContent',
  title,
  titleVariant = 'body1',
  descriptionVariant = 'body2',
  titleColor = 'default',
  descriptionColor = 'default',
  isLoading = false,
  style,
}) => {
  const { gutters, layout } = useTheme();
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    return (
      <>
        {typeof icon === 'string' ? <IconByVariant path={icon} /> : icon}
        {title && (
          <Text
            variant={titleVariant}
            color={titleColor}
            weight="semibold"
            style={[gutters.marginTop_10, staticFontStyles.alignCenter]}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            variant={descriptionVariant}
            color={descriptionColor}
            style={[gutters.marginTop_6, staticFontStyles.alignCenter]}
          >
            {description}
          </Text>
        )}
      </>
    );
  };
  return (
    <View style={[layout.itemsCenter, layout.justifyCenter, style]}>
      {renderContent()}
    </View>
  );
};

export default EmptyContent;
