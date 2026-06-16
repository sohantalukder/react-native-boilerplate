import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { EXAMPLE_STYLES } from '@/modules/example/constants/example.constant';
import { Text, useTheme } from '@sohantalukder/rn-kit';

export function ExampleWelcome() {
  const { t } = useTranslation();
  const { gutters, typographies } = useTheme();

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_32]}>
      <Text
        variant="heading1"
        weight="bold"
        style={[typographies.heading1, EXAMPLE_STYLES.centerText]}
      >
        {t('boilerplate.screen_example.title')}
      </Text>

      <Text
        variant="body1"
        color="secondary"
        style={[gutters.marginTop_16, EXAMPLE_STYLES.centerTextWithLineHeight]}
      >
        {t('boilerplate.screen_example.description')}
      </Text>
    </View>
  );
}
