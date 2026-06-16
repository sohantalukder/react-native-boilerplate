import { View } from 'react-native';

import defaultLogo from '@/assets/images/logo.png';
import rs from '@/shared/utilities/responsiveSize';
import { Image, useTheme } from '@sohantalukder/rn-kit';

export function ExampleHeader() {
  const { colors, gutters, layout, logo } = useTheme();

  return (
    <View style={[layout.itemsCenter, gutters.marginTop_40]}>
      <View
        style={[
          layout.relative,
          {
            width: rs(200),
            height: rs(200),
            borderRadius: rs(100),
            backgroundColor: colors.primary + '15',
          },
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Image
          source={logo ?? defaultLogo}
          resizeMode="contain"
          style={{
            height: rs(120),
            width: rs(120),
          }}
        />
      </View>
    </View>
  );
}
