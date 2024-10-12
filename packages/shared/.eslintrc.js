const { resolve } = require('path');

module.exports = {
  extends: ['@repo/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
};
