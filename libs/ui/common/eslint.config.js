const baseConfig = require('../../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/ui/common/**/*.ts',
      'libs/ui/common/**/*.tsx',
      'libs/ui/common/**/*.js',
      'libs/ui/common/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/ui/common/**/*.ts', 'libs/ui/common/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/ui/common/**/*.js', 'libs/ui/common/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
