const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/contract/**/*.ts',
      'libs/contract/**/*.tsx',
      'libs/contract/**/*.js',
      'libs/contract/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/contract/**/*.ts', 'libs/contract/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/contract/**/*.js', 'libs/contract/**/*.jsx'],
    rules: {},
  },
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
    ...config,
    files: ['libs/contract/**/*.json'],
    rules: {
      '@nx/dependency-checks': 'error',
    },
  })),
];
