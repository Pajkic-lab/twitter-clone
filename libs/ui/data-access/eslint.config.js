const baseConfig = require('../../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/ui/data-access/**/*.ts',
      'libs/ui/data-access/**/*.tsx',
      'libs/ui/data-access/**/*.js',
      'libs/ui/data-access/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/ui/data-access/**/*.ts', 'libs/ui/data-access/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/ui/data-access/**/*.js', 'libs/ui/data-access/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
