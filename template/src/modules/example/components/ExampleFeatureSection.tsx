import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ExampleFeatureCard } from '@/modules/example/components/ExampleFeatureCard';
import type { ExampleFeatureViewItem } from '@/modules/example/types/example.type';
import { Divider, Text, useTheme } from '@sohantalukder/rn-kit';

interface ExampleFeatureSectionProps {
  features: ExampleFeatureViewItem[];
}

export function ExampleFeatureSection({
  features,
}: ExampleFeatureSectionProps) {
  const { t } = useTranslation();
  const { gutters } = useTheme();

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
      <Text
        variant="heading2"
        weight="semibold"
        style={gutters.marginBottom_24}
      >
        {t('boilerplate.screen_example.explore_features')}
      </Text>

      {features.map((feature, index) => (
        <View key={feature.title}>
          <ExampleFeatureCard feature={feature} />

          {index < features.length - 1 && (
            <View style={gutters.marginBottom_8}>
              <Divider />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
