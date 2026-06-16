import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import {
  EXAMPLE_STATS_LIST,
  EXAMPLE_STYLES,
} from '@/modules/example/constants/example.constant';
import { Card, Text, useTheme } from '@sohantalukder/rn-kit';

export function ExampleStatsSection() {
  const { t } = useTranslation();
  const { colors, gutters, layout } = useTheme();

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_32]}>
      <Card
        variant="filled"
        borderRadius={16}
        padding={24}
        elevation={2}
        backgroundColor={colors.primary + '10'}
      >
        <Text
          variant="body1"
          weight="semibold"
          style={[gutters.marginBottom_16, EXAMPLE_STYLES.centerText]}
        >
          {t('boilerplate.screen_example.stats.title')}
        </Text>

        <View style={[layout.row, layout.justifyBetween]}>
          {EXAMPLE_STATS_LIST.map((stat) => (
            <View
              key={stat.labelKey}
              style={layout.itemsCenter}
            >
              <Text
                variant="heading2"
                weight="bold"
                color="primary"
              >
                {stat.value}
              </Text>
              <Text
                variant="body3"
                color="secondary"
              >
                {t(stat.labelKey)}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
}
