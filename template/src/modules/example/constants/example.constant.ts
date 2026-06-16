export type ExampleFeatureAction =
  | 'fetchUser'
  | 'toggleTheme'
  | 'toggleLanguage';

export const EXAMPLE_STYLES = {
  centerText: { textAlign: 'center' as const },
  centerTextWithLineHeight: { textAlign: 'center' as const, lineHeight: 24 },
};

export const EXAMPLE_FEATURE_LIST = [
  {
    action: 'fetchUser',
    icon: 'send',
    titleKey: 'boilerplate.screen_example.features.api_integration.title',
    descriptionKey:
      'boilerplate.screen_example.features.api_integration.description',
    buttonTextKey: 'boilerplate.screen_example.features.api_integration.button',
  },
  {
    action: 'toggleTheme',
    icon: 'theme',
    titleKey: 'boilerplate.screen_example.features.theme_toggle.title',
    descriptionKey:
      'boilerplate.screen_example.features.theme_toggle.description',
    buttonTextKey: 'boilerplate.screen_example.features.theme_toggle.button',
  },
  {
    action: 'toggleLanguage',
    icon: 'language',
    titleKey: 'boilerplate.screen_example.features.language_switch.title',
    descriptionKey:
      'boilerplate.screen_example.features.language_switch.description',
    buttonTextKey: 'boilerplate.screen_example.features.language_switch.button',
  },
] as const satisfies ReadonlyArray<{
  action: ExampleFeatureAction;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
}>;

export const EXAMPLE_STATS_LIST = [
  {
    value: '5+',
    labelKey: 'boilerplate.screen_example.stats.components',
  },
  {
    value: '10+',
    labelKey: 'boilerplate.screen_example.stats.utilities',
  },
  {
    value: '2',
    labelKey: 'boilerplate.screen_example.stats.languages',
  },
  {
    value: '\u221E',
    labelKey: 'boilerplate.screen_example.stats.possibilities',
  },
] as const;
