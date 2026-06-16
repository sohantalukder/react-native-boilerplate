import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EXAMPLE_FEATURE_LIST,
  type ExampleFeatureAction,
} from '@/modules/example/constants/example.constant';
import { useRandomUserQuery } from '@/modules/example/hooks/useRandomUserQuery';
import type { ExampleFeatureViewItem } from '@/modules/example/types/example.type';
import { useI18n } from '@/shared/hooks/language/useI18n';
import { toast, useTheme } from '@sohantalukder/rn-kit';

export function useExampleController() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { toggleLanguage } = useI18n();
  const {
    data: userData,
    isFetching: isUserFetching,
    refetch: fetchRandomUserQuery,
  } = useRandomUserQuery();

  const { changeTheme, variant } = theme;

  const onChangeTheme = useCallback(() => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  }, [changeTheme, variant]);

  const fetchRandomUser = useCallback(async () => {
    try {
      const { data: user } = await fetchRandomUserQuery({
        throwOnError: true,
      });

      if (user) {
        toast.show({
          type: 'success',
          title: t('boilerplate.screen_example.api_messages.success_message', {
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.show({
        type: 'error',
        title: t('boilerplate.screen_example.api_messages.error_message'),
      });
    }
  }, [fetchRandomUserQuery, t]);

  const featureActions = useMemo<Record<ExampleFeatureAction, () => void>>(
    () => ({
      fetchUser: fetchRandomUser,
      toggleTheme: onChangeTheme,
      toggleLanguage,
    }),
    [fetchRandomUser, onChangeTheme, toggleLanguage]
  );

  const features = useMemo<ExampleFeatureViewItem[]>(
    () =>
      EXAMPLE_FEATURE_LIST.map((feature) => ({
        title: t(feature.titleKey),
        description: t(feature.descriptionKey),
        icon: feature.icon,
        onPress: featureActions[feature.action],
        isLoading: feature.action === 'fetchUser' ? isUserFetching : false,
        buttonText: t(feature.buttonTextKey),
      })),
    [featureActions, isUserFetching, t]
  );

  return {
    features,
    userData,
  };
}
