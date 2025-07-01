import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { useTheme } from '@/theme';

import rs from '@/shared/utilities/responsiveSize';
import routes from '@/navigation/routes';
import { SafeScreen } from '@/shared/components/templates';
import { Image } from '@/shared/components/atoms';

function Startup({ navigation }: RootScreenProps<typeof routes.startup>) {
  const { layout, gutters, logo } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => {
      return Promise.resolve(true);
    },
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: routes.example }],
      });
    }
  }, [isSuccess, navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Image
          source={logo}
          resizeMode="contain"
          style={{ height: rs(300), width: rs(300) }}
        />
        {isFetching ? (
          <ActivityIndicator
            size="large"
            style={gutters.marginVertical_24}
          />
        ) : undefined}
        {isError ? <Text>{t('common_error')}</Text> : undefined}
      </View>
    </SafeScreen>
  );
}

export default Startup;
