// eslint.config.mjs
import { ESLint } from 'eslint';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['*.ts', '*.vue'],
    languageOptions: {
      parser: parser,  // Use the parser as a function (imported from the module)
    },
    rules: {
      // Your specific rules for .ts and .vue files
    },
  },
  // Additional configurations can go here
];
