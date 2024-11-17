module.exports = {
    env: {
      node: true,
      jest: true,  // Add jest environment for testing-related globals
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      // Add your specific rules here
    },
  };
  