import { useTranslation } from 'react-i18next';
import { ScrollView, View, Alert } from 'react-native';
import { useState } from 'react';

import { useTheme } from '@/theme';
import { useI18n } from '@/shared/hooks/language/useI18n';
import { apiInstances } from '@/config/http/apiInstance.config';

import {
  IconByVariant,
  Image,
  Text,
  Button,
  Card,
  Divider,
} from '@/shared/components/atoms';
import { SafeScreen } from '@/shared/components/templates';
import rs from '@/shared/utilities/responsiveSize';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  username: string;
}

function Example() {
  const { t } = useTranslation();
  const { toggleLanguage } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const { changeTheme, colors, gutters, layout, variant, logo, typographies } =
    useTheme();

  const styles = {
    centerText: { textAlign: 'center' as const },
    centerTextWithLineHeight: { textAlign: 'center' as const, lineHeight: 24 },
  };

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const fetchRandomUser = async () => {
    try {
      setIsLoading(true);
      // Using the configured API instance to fetch a random user
      const response = await apiInstances.businessService.get<{
        users: User[];
      }>('users?limit=1');
      if (response.users && response.users.length > 0) {
        const user = response.users[0];
        if (user) {
          setUserData(user);
          Alert.alert(
            t('boilerplate.screen_example.api_messages.success_title'),
            t('boilerplate.screen_example.api_messages.success_message', {
              firstName: user.firstName,
              lastName: user.lastName,
            }),
            [
              {
                text: t(
                  'boilerplate.screen_example.api_messages.success_button'
                ),
              },
            ]
          );
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      Alert.alert(
        t('boilerplate.screen_example.api_messages.error_title'),
        t('boilerplate.screen_example.api_messages.error_message'),
        [{ text: t('boilerplate.screen_example.api_messages.error_button') }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      title: t('boilerplate.screen_example.features.api_integration.title'),
      description: t(
        'boilerplate.screen_example.features.api_integration.description'
      ),
      icon: 'send',
      onPress: fetchRandomUser,
      isLoading,
      buttonText: t(
        'boilerplate.screen_example.features.api_integration.button'
      ),
    },
    {
      title: t('boilerplate.screen_example.features.theme_toggle.title'),
      description: t(
        'boilerplate.screen_example.features.theme_toggle.description'
      ),
      icon: 'theme',
      onPress: onChangeTheme,
      isLoading: false,
      buttonText: t('boilerplate.screen_example.features.theme_toggle.button'),
    },
    {
      title: t('boilerplate.screen_example.features.language_switch.title'),
      description: t(
        'boilerplate.screen_example.features.language_switch.description'
      ),
      icon: 'language',
      onPress: toggleLanguage,
      isLoading: false,
      buttonText: t(
        'boilerplate.screen_example.features.language_switch.button'
      ),
    },
  ];

  return (
    <SafeScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
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
              source={logo}
              resizeMode="contain"
              style={{
                height: rs(120),
                width: rs(120),
              }}
            />
          </View>
        </View>

        {/* Welcome Section */}
        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_32]}>
          <Text
            variant="heading1"
            weight="bold"
            style={[typographies.heading1, styles.centerText]}
          >
            {t('boilerplate.screen_example.title')}
          </Text>

          <Text
            variant="body1"
            color="secondary"
            style={[gutters.marginTop_16, styles.centerTextWithLineHeight]}
          >
            {t('boilerplate.screen_example.description')}
          </Text>
        </View>

        {/* User Data Display */}
        {userData && (
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
        )}

        {/* Features Section */}
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

              {index < features.length - 1 && (
                <View style={gutters.marginBottom_8}>
                  <Divider />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Stats Section */}
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
              style={[gutters.marginBottom_16, styles.centerText]}
            >
              {t('boilerplate.screen_example.stats.title')}
            </Text>

            <View style={[layout.row, layout.justifyBetween]}>
              <View style={layout.itemsCenter}>
                <Text
                  variant="heading2"
                  weight="bold"
                  color="primary"
                >
                  5+
                </Text>
                <Text
                  variant="body3"
                  color="secondary"
                >
                  {t('boilerplate.screen_example.stats.components')}
                </Text>
              </View>

              <View style={layout.itemsCenter}>
                <Text
                  variant="heading2"
                  weight="bold"
                  color="primary"
                >
                  10+
                </Text>
                <Text
                  variant="body3"
                  color="secondary"
                >
                  {t('boilerplate.screen_example.stats.utilities')}
                </Text>
              </View>

              <View style={layout.itemsCenter}>
                <Text
                  variant="heading2"
                  weight="bold"
                  color="primary"
                >
                  2
                </Text>
                <Text
                  variant="body3"
                  color="secondary"
                >
                  {t('boilerplate.screen_example.stats.languages')}
                </Text>
              </View>

              <View style={layout.itemsCenter}>
                <Text
                  variant="heading2"
                  weight="bold"
                  color="primary"
                >
                  ∞
                </Text>
                <Text
                  variant="body3"
                  color="secondary"
                >
                  {t('boilerplate.screen_example.stats.possibilities')}
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom Spacing */}
        <View style={gutters.marginBottom_40} />
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
