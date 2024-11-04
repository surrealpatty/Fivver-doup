import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true, // Enables browser global variables
    es2021: true,  // Specifies ECMAScript 2021 features
  },
  languageOptions: {
    // Define global variables here
    globals: {
      window: 'readonly',  // 'window' is a read-only global variable
      document: 'readonly', // 'document' is a read-only global variable
      process: 'readonly',  // 'process' is a read-only global variable
      // Add more global variables as needed
    },
  },
  // Rules and settings
  rules: {
    'no-console': 'warn', // Warns on console usage
    'semi': ['error', 'always'], // Enforce semicolons
    // Add other rules here
  },
  // Additional configurations can go here
});
