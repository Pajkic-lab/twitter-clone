const baseConfig = require('../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'libs/data/**/*.ts',
      'libs/data/**/*.tsx',
      'libs/data/**/*.js',
      'libs/data/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['libs/data/**/*.ts', 'libs/data/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/data/**/*.js', 'libs/data/**/*.jsx'],
    rules: {},
  },
];
