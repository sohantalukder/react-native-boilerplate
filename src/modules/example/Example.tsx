import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useI18n } from '@/shared/hooks/language/useI18n';

import { IconByVariant, Image, Text } from '@/shared/components/atoms';
import { SafeScreen } from '@/shared/components/templates';
import rs from '@/shared/utilities/responsiveSize';

function Example() {
  const { t } = useTranslation();
  const { toggleLanguage } = useI18n();

  const {
    backgrounds,
    changeTheme,
    colors,
    gutters,
    layout,
    variant,
    borders,
    logo,
  } = useTheme();

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray0, borders.rounded_80]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <Image
              source={logo}
              resizeMode="contain"
              style={{ height: rs(300), width: rs(300) }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={gutters.marginTop_40}>
            <Text>{t('screen_example.title')}</Text>
            <Text style={gutters.marginBottom_40}>
              {t('screen_example.description')}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              style={[borders.rounded_80, gutters.marginBottom_16]}
              testID="fetch-user-button"
            >
              <IconByVariant
                path="send"
                stroke={colors.purple}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[borders.rounded_80, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant
                path="theme"
                stroke={colors.purple}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleLanguage}
              style={[borders.rounded_80, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant
                path="language"
                stroke={colors.purple}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
