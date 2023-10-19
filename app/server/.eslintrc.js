module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//     'plugin:import/typescript',
//     'plugin:jest/recommended',
//     'eslint:recommended',
//     'airbnb-typescript',
//     'airbnb',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js', 'client/*'],
//   rules: {
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',

//     'import/no-extraneous-dependencies': 'off',
//     'import/prefer-default-export': 'off',
//     'class-methods-use-this': 'off',
//     'import/no-unresolved': 'off',
//     'linebreak-style': 'off',
//     'arrow-parens': 'off',

//     'object-curly-newline': [
//       'error',
//       {
//         ObjectExpression: { multiline: true, minProperties: 1 },
//       },
//     ],

//     '@typescript-eslint/no-useless-constructor': 'warn',
//     '@typescript-eslint/no-empty-function': 'warn',
//     'no-useless-constructor': 'warn',
//     'no-empty-function': 'warn',
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
//   },
// };
