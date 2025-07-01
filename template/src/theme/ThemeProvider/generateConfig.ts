import type { HasProperty } from '@/theme/types/common';
import type {
  FulfilledThemeConfiguration,
  Variant,
} from '@/theme/types/config';

import { config } from '@/theme/_config';

function hasProperty<Config, KeyPath extends string>(
  configuration: Config,
  property: KeyPath
): configuration is Config & HasProperty<Config, KeyPath> {
  const parts = property.split('.');

  let currentObject: unknown = configuration;

  for (const part of parts) {
    if (
      typeof currentObject !== 'object' ||
      currentObject === null ||
      !(part in currentObject)
    ) {
      return false;
    }

    currentObject = (currentObject as Record<string, unknown>)[part];
  }

  return true;
}

const buildConfig = (variant: Variant) => {
  const { variants, ...defaultConfig } = config;
  const variantConfig = variant === 'default' ? undefined : variants[variant];

  const fontColors = {
    ...defaultConfig.fonts.colors,
    ...(variantConfig && hasProperty(variantConfig, 'fonts.colors')
      ? variantConfig.fonts.colors
      : {}),
  };
  const backgroundColors = {
    ...defaultConfig.backgrounds,
    ...(variantConfig && hasProperty(variantConfig, 'backgrounds')
      ? variantConfig.backgrounds
      : {}),
  };
  const borderColors = {
    ...defaultConfig.borders.colors,
    ...(variantConfig && hasProperty(variantConfig, 'borders.colors')
      ? variantConfig.borders.colors
      : {}),
  };
  const navigationColors = {
    ...defaultConfig.navigationColors,
    ...(variantConfig && hasProperty(variantConfig, 'navigationColors')
      ? variantConfig.navigationColors
      : {}),
  };
  const colors = {
    ...defaultConfig.colors,
    ...(variantConfig && hasProperty(variantConfig, 'colors')
      ? variantConfig.colors
      : {}),
  };

  return {
    backgrounds: backgroundColors,
    borders: {
      colors: borderColors,
      radius: defaultConfig.borders.radius,
      widths: defaultConfig.borders.widths,
    },
    colors,
    fonts: {
      colors: fontColors,
      sizes: defaultConfig.fonts.sizes,
    },
    gutters: defaultConfig.gutters,
    navigationColors,
  } as const satisfies FulfilledThemeConfiguration;
};

export default buildConfig;
