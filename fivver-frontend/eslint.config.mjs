import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  // Language options
  languageOptions: {
    globals: {
      // Define your global variables here, for example:
      // myGlobalVariable: 'readonly', // or 'writable'
    },
  },
  // Add your rules and settings here
  rules: {
    // Example rule
    'no-console': 'warn',
  },
  // Other configurations
});
