import { View } from 'react-native';

import type { ExampleUser } from '@/modules/example/types/example.type';
import rs from '@/shared/utilities/responsiveSize';
import { Card, Image, Text, useTheme } from '@sohantalukder/rn-kit';

interface ExampleUserCardProps {
  userData: ExampleUser | undefined;
}

export function ExampleUserCard({ userData }: ExampleUserCardProps) {
  const { gutters, layout } = useTheme();

  if (!userData) {
    return null;
  }

  return (
    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_32]}>
      <Card
        variant="elevated"
        elevation={3}
        borderRadius={16}
        padding={20}
      >
        <View style={[layout.row, layout.itemsCenter, gutters.gap_16]}>
          <Image
            source={{ uri: userData.image }}
            style={{
              width: rs(60),
              height: rs(60),
              borderRadius: rs(30),
            }}
          />
          <View style={layout.flex_1}>
            <Text
              variant="body1"
              weight="semibold"
            >
              {userData.firstName} {userData.lastName}
            </Text>
            <Text
              variant="body2"
              color="secondary"
            >
              @{userData.username}
            </Text>
            <Text
              variant="body3"
              color="secondary"
            >
              {userData.email}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}
