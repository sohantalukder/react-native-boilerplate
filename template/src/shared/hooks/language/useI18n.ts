/* eslint-disable no-void */
import i18next from 'i18next';

import { SupportedLanguages } from './schema';

const changeLanguage = (lang: SupportedLanguages) => {
  void i18next.changeLanguage(lang);
};

const toggleLanguage = () => {
  void i18next.changeLanguage(
    i18next.language === SupportedLanguages.EN_EN
      ? SupportedLanguages.BN_BN
      : SupportedLanguages.EN_EN
  );
};

export const useI18n = () => {
  return { changeLanguage, toggleLanguage };
};
