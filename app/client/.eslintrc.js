const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    semi: ['warn', 'never'],
    quotes: [1, 'single', { allowTemplateLiterals: true }],
    strict: [2, 'never'],
    curly: [2, 'all'],
    'no-console': 1,
    'no-debugger': IS_PROD ? 'error' : 'warn',
    'no-confusing-arrow': 'error',
    'arrow-spacing': 'warn',
    'no-unused-vars': 'off',
    'no-delete-var': 'error',
    'no-whitespace-before-property': 'warn',
    'react/display-name': 'off',
    'arrow-parens': [1, 'as-needed'],
    '@typescript-eslint/camelcase': 0,
    'jsx-a11y/heading-has-content': 0,
    'prettier/prettier': 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/restrict-template-expressions': 'warn',
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    // TODO: turn on later
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
