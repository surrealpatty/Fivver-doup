// eslint.config.mjs
import { ESLint } from 'eslint';
import parser from '@typescript-eslint/parser';  // Ensure you're importing the right version

export default [
  {
    files: ['*.ts', '*.vue'],
    languageOptions: {
      parser: parser,  // Use the parser function
    },
    rules: {
      // Your specific rules for .ts and .vue files
    },
  },
  // Additional configurations can go here
];
