module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
    es2020: true,
  },

  /* Base Configuration Extensions */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    '@react-native',
  ],

  /* Ignored Paths */
  ignorePatterns: [
    'dist',
    '.eslintrc.js',
    'libs',
    '**/*.html',
    'android',
    'ios',
    'vendor',
  ],

  /* Parser and Plugins */
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  /* Settings */
  settings: {
    react: {
      version: 'detect',
    },
  },

  /* Custom Rule Overrides */
  rules: {
    /* React Native Specific Rules */
    'react-native/no-unused-styles': 'off',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-raw-text': ['error', { skip: ['CustomText'] }],
    'react-native/no-single-element-style-arrays': 'error',

    /* Formatting and Style */
    indent: 'off',
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': ['error', 'unix'],
    'object-curly-newline': 'off',
    'max-len': 'off',
    'function-paren-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-confusing-arrow': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-trailing-spaces': [
      'error',
      { skipBlankLines: true, ignoreComments: true },
    ],
    'eol-last': ['error', 'always'],

    /* React and JSX Rules */
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    /* TypeScript Rules */
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        destructuredArrayIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],

    /* Common JavaScript Rules */
    'no-dupe-keys': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'params', 'value'],
      },
    ],

    /* React Hooks Rules */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    /* ESLint Rules */
    curly: 'off',
  },
};
