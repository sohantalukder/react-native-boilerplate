import { View } from 'react-native';

import type { ExampleFeatureViewItem } from '@/modules/example/types/example.type';
import rs from '@/shared/utilities/responsiveSize';
import {
  Button,
  Card,
  IconByVariant,
  Text,
  useTheme,
} from '@sohantalukder/rn-kit';

interface ExampleFeatureCardProps {
  feature: ExampleFeatureViewItem;
}

export function ExampleFeatureCard({ feature }: ExampleFeatureCardProps) {
  const { colors, gutters, layout } = useTheme();

  return (
    <Card
      variant="outlined"
      borderRadius={12}
      padding={20}
      margin={0}
      elevation={1}
      style={gutters.marginBottom_16}
    >
      <View style={[layout.row, layout.itemsCenter, gutters.gap_16]}>
        <View
          style={[
            {
              width: rs(48),
              height: rs(48),
              borderRadius: rs(24),
              backgroundColor: colors.primary + '15',
            },
            layout.itemsCenter,
            layout.justifyCenter,
          ]}
        >
          <IconByVariant
            path={feature.icon}
            stroke={colors.text}
            width={24}
            height={24}
          />
        </View>

        <View style={layout.flex_1}>
          <Text
            variant="body1"
            weight="semibold"
          >
            {feature.title}
          </Text>
          <Text
            variant="body2"
            color="secondary"
            style={gutters.marginTop_4}
          >
            {feature.description}
          </Text>
        </View>
      </View>

      <View style={gutters.marginTop_16}>
        <Button
          text={feature.buttonText}
          variant="primary"
          onPress={feature.onPress}
          isLoading={feature.isLoading}
          iconColor={colors.white}
          icon={feature.icon}
          borderRadius={12}
        />
      </View>
    </Card>
  );
}
