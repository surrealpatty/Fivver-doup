module.exports = {
  root: true, // Mark this as the root configuration file
  env: {
      node: true, // Enable Node.js globals
      jest: true, // Enable Jest globals like describe, it, expect, etc.
      es2020: true, // Enable ES2020 features
  },
  extends: [
      'eslint:recommended', // Basic linting rules
      'plugin:@typescript-eslint/recommended', // TypeScript linting rules
      'plugin:jest/recommended', // Jest linting rules
  ],
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
      ecmaVersion: 2020, // ECMAScript version
      sourceType: 'module', // Allow import/export syntax
  },
  plugins: [
      '@typescript-eslint', // TypeScript plugin
      'jest', // Jest plugin
  ],
  rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Warn about unused variables
      'no-undef': 'off', // Disable no-undef, since it's handled by TypeScript
      'no-console': 'off', // Allow console.log statements
      'prefer-const': 'warn', // Prefer const for variables that are not reassigned
      'no-constant-condition': 'warn', // Warn about conditions that are always true/false
      'no-fallthrough': 'warn', // Warn about fallthrough in switch cases
  },
  settings: {
      jest: {
          version: 'detect', // Automatically detect the Jest version
      },
  },
};
