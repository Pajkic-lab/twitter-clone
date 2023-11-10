const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  {
    files: [
      'apps/client/**/*.ts',
      'apps/client/**/*.tsx',
      'apps/client/**/*.js',
      'apps/client/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['apps/client/**/*.ts', 'apps/client/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/client/**/*.js', 'apps/client/**/*.jsx'],
    rules: {},
  },
];
