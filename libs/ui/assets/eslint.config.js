const baseConfig = require('../../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/ui/assets/**/*.ts',
      'libs/ui/assets/**/*.tsx',
      'libs/ui/assets/**/*.js',
      'libs/ui/assets/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/ui/assets/**/*.ts', 'libs/ui/assets/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/ui/assets/**/*.js', 'libs/ui/assets/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
