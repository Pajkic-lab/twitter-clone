const baseConfig = require('../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: [
      'apps/server-e2e/**/*.ts',
      'apps/server-e2e/**/*.tsx',
      'apps/server-e2e/**/*.js',
      'apps/server-e2e/**/*.jsx',
    ],
    rules: {},
  },
  {
    files: ['apps/server-e2e/**/*.ts', 'apps/server-e2e/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/server-e2e/**/*.js', 'apps/server-e2e/**/*.jsx'],
    rules: {},
  },
];
