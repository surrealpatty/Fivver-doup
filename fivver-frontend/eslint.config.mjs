import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2021, // Specify the ECMAScript version
      sourceType: 'module', // Specify source type if using ES modules
    },
    globals: {
      window: 'readonly',  // 'window' is a read-only global variable
      document: 'readonly', // 'document' is a read-only global variable
      process: 'readonly',  // 'process' is a read-only global variable
      // Add more global variables as needed
    },
  },
  rules: {
    'no-console': 'warn', // Warns on console usage
    'semi': ['off'], // Enforce semicolons
    // Add other rules here
  },
});
