import localStore from '@/services/storage/localStore.service';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define types for the resources and translations
interface TranslationResources {
  [language: string]: {
    [namespace: string]: Record<string, unknown>;
  };
}

// Import translation files
// Note: require.context is a webpack-specific function, TypeScript needs a declaration
declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys(): string[];
    (id: string): Record<string, unknown>;
  };
};

const files = require.context('../translations', true, /\.json$/);

// Process the imported files into the format i18next expects
const resources: TranslationResources = {};

files.keys().forEach((key: string): void => {
  // Extract language from file path
  const match = key.match(/^\.\/([a-z]{2}-[A-Z]{2})\.json$/);

  if (match) {
    const language: string = match[1];

    // Initialize the language object if it doesn't exist yet
    if (!resources[language]) {
      resources[language] = {};
    }

    // Add the translations directly to the language
    const translations = files(key);
    Object.assign(resources[language], translations);
  }
});

// Detect available namespaces from the first available language
const firstLanguage = Object.keys(resources)[0];
const availableNamespaces = firstLanguage
  ? Object.keys(resources[firstLanguage])
  : ['translation'];

i18n.use(initReactI18next).init({
  resources,
  returnNull: false,
  fallbackLng: 'en-EN',
  ns: availableNamespaces,
  defaultNS: availableNamespaces[0] || 'translation',
  lng: localStore.getSystemLanguage(),
  returnEmptyString: false,
  interpolation: { escapeValue: false },
});

// Extend the i18next types (optional, but useful if you're using TypeScript throughout your app)
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'shared';
    resources: {
      shared: Record<string, string>;
      // Add other namespaces here as needed
    };
  }
}

export default i18n;
