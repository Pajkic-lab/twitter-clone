const baseConfig = require('../../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/ui/components/**/*.ts',
      'libs/ui/components/**/*.tsx',
      'libs/ui/components/**/*.js',
      'libs/ui/components/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/ui/components/**/*.ts', 'libs/ui/components/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/ui/components/**/*.js', 'libs/ui/components/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
