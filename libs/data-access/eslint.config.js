const baseConfig = require('../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/data-access/**/*.ts',
      'libs/data-access/**/*.tsx',
      'libs/data-access/**/*.js',
      'libs/data-access/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/data-access/**/*.ts', 'libs/data-access/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/data-access/**/*.js', 'libs/data-access/**/*.jsx'],
    rules: {},
  },
];
