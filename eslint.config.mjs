// eslint.config.mjs

import parser from '@typescript-eslint/parser';

export default {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript linting rules
    'plugin:vue/vue3-recommended',            // Vue 3 linting rules
  ],
  parser, // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,    // Set ECMAScript version
    sourceType: 'module', // Enable ES Modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing for .tsx files (React)
    },
  },
  plugins: ['@typescript-eslint', 'vue'], // Add TypeScript and Vue plugins
  rules: {
    // Define your custom linting rules
    'no-console': 'warn',  // Example rule: warn on console statements
    '@typescript-eslint/no-explicit-any': 'warn', // Allow 'any' with warning
    'vue/no-unused-vars': 'warn', // Warn on unused variables in Vue
    // Add more rules as needed
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // For TypeScript and TSX files
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return type rule for convenience
      },
    },
  ],
};
