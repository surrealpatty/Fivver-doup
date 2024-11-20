import { ESLint } from 'eslint';
import parser from '@typescript-eslint/parser';  // Ensure you're importing the right version

export default [
  {
    files: ['*.ts', '*.tsx', '*.vue'],  // Include .tsx as well for React components if needed
    languageOptions: {
      parser,  // Use the parser function
      parserOptions: {
        ecmaVersion: 2020, // Set ECMAScript version (optional, you can customize as needed)
        sourceType: 'module', // Use modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing for .tsx files (React)
        },
      },
    },
    rules: {
      // Define specific rules for .ts, .tsx, and .vue files
      'no-console': 'warn',  // Example rule
    },
  },
  // Additional configurations can go here for other file types or environments
];
