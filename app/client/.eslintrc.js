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
    // '@typescript-eslint/no-misused-promises': 1, //// should be removed

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

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//   },
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   root: true,
//   ignorePatterns: ['.eslintrc.js'],
//   extends: ['plugin:prettier/recommended', 'plugin:react/recommended', 'standard-with-typescript', 'plugin:import/typescript', 'eslint:recommended', 'airbnb-typescript', 'react-app/jest', 'airbnb'],
//   overrides: [],
//   plugins: ['react', '@typescript-eslint/eslint-plugin', 'prettier'],
//   rules: {
//     '@typescript-eslint/member-delimiter-style': 'off',
//     '@typescript-eslint/triple-slash-reference': 'off',
//     '@typescript-eslint/no-non-null-assertion': 'off',
//     'react/jsx-filename-extension': 'off',
//     'import/prefer-default-export': 'off',
//     'implicit-arrow-linebreak': 'off',
//     'react/react-in-jsx-scope': 'off',
//     'import/no-unresolved': 'off',
//     'operator-linebreak': 'off',
//     'no-param-reassign': 'off',
//     'react/jsx-no-bind': 'off',
//     'linebreak-style': 'off',
//     'arrow-parens': 'off',

//     'import/no-cycle': [2, { maxDepth: 1 }],
//     'max-len': ['error', { code: 200 }],

//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         js: 'never',
//         jsx: 'never',
//         ts: 'never',
//         tsx: 'never',
//       },
//     ],
//     '@typescript-eslint/explicit-module-boundary-types': 'warn',
//     '@typescript-eslint/explicit-function-return-type': 'warn',
//     '@typescript-eslint/no-floating-promises': 'warn',
//     'no-promise-executor-return': 'warn',
//     '@typescript-eslint/indent': 'warn',
//     indent: 'warn',
//   },
// };
