module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 90,
        semi: false,
      },
    ],

    // Rules that consumers might want to enforce, but seems to restrictive to be default:
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/array-type': 'off',

    // Rules that doesn't make sense:
    '@typescript-eslint/no-explicit-any': 'off', // that seems to restrictive
    '@typescript-eslint/prefer-interface': 'off', // you might not want people to extend your types
    'no-unused-vars': 'off', // replaced by @typescript-eslint/no-unused-vars
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
