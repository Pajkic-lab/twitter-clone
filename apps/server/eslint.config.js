const baseConfig = require('../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'apps/server/**/*.ts',
      'apps/server/**/*.tsx',
      'apps/server/**/*.js',
      'apps/server/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['apps/server/**/*.ts', 'apps/server/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/server/**/*.js', 'apps/server/**/*.jsx'],
    rules: {},
  },
];
