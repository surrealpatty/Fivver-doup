module.exports = {
    env: {
      node: true,  // Indicates the environment is Node.js
      jest: true,  // Enable Jest globals like describe, it, expect, etc.
      es2020: true, // Enable ES2020 features
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',  // Enable TypeScript-specific linting rules
      'plugin:jest/recommended',  // Enable Jest-specific linting rules
    ],
    parser: '@typescript-eslint/parser',  // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 2020,  // Allow parsing of ECMAScript 2020 syntax
      sourceType: 'module',  // Allow the use of import/export syntax
    },
    plugins: ['@typescript-eslint', 'jest'],  // Add Jest plugin for Jest-specific linting rules
    rules: {
      // Custom rules can be added here if needed
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn on unused variables
      'no-undef': 'off',  // Disable `no-undef` since it's already handled by environment settings
      'no-console': 'off',  // Allow console.log statements, useful for debugging
      'no-unused-vars': 'warn',  // Warn on unused variables
      'prefer-const': 'warn',  // Prefer `const` for variables that are not reassigned
      'no-constant-condition': 'warn',  // Warn if there are conditions that are always true/false
      'no-fallthrough': 'warn',  // Warn on fallthrough in switch cases
    },
    settings: {
      jest: {
        version: 'detect',  // Automatically detect the Jest version
      },
    },
  };
  