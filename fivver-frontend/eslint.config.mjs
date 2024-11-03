import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  // Language options
  languageOptions: {
    // Define global variables here
    globals: {
      window: 'readonly',  // Indicates that 'window' is a read-only global variable
      document: 'readonly', // Indicates that 'document' is a read-only global variable
      process: 'readonly',  // Indicates that 'process' is a read-only global variable
      // Add more global variables as needed
    },
  },
  // Rules and settings
  rules: {
    'no-console': 'warn', // Example rule
    // Add other rules here
  },
  // Other configurations can go here
});
