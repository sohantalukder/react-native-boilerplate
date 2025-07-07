import { View } from 'react-native';

import { useTheme } from '@/theme';
import Text from '../text/Text';
import { IconButton, IconByVariant } from '@/shared/components/atoms';
import { useMemo } from 'react';

export type ToastVariant = 'success' | 'info' | 'error';
export type ToastProps = {
  type: ToastVariant;
  title: string;
};

const Toast: React.FC<ToastProps & { onDismiss?: () => void }> = ({
  type,
  title,
  onDismiss,
}) => {
  const { layout, gutters, borders, backgrounds, colors } = useTheme();

  const icon = (
    {
      success: 'success',
      info: 'info',
      error: 'error',
    } as const
  )[type];

  const shadow = useMemo(
    () => ({
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 0.84,
      elevation: 1,
    }),
    [colors.text]
  );

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        gutters.gap_10,
        borders.rounded_8,
        gutters.paddingHorizontal_8,
        gutters.paddingVertical_10,
        backgrounds.background,
        layout.flex_1,
        shadow,
      ]}
    >
      <IconByVariant
        path={icon}
        width={24}
        height={24}
      />

      <Text
        weight="semibold"
        numberOfLines={1}
        style={[layout.flexShrink_1, layout.flexGrow_1]}
      >
        {title}
      </Text>

      <IconButton
        icon="cancel"
        onPress={onDismiss || (() => {})}
      />
    </View>
  );
};

export default Toast;
