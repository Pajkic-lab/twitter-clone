const baseConfig = require('../../eslint.config.js');
const unicorn = require('eslint-plugin-unicorn');
const prettier = require('eslint-config-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

module.exports = [
  ...baseConfig,
  {
    files: [
      'apps/server/**/*.ts',
      'apps/server/**/*.tsx',
      'apps/server/**/*.js',
      'apps/server/**/*.jsx',
    ],
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
