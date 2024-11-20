// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    files: ['*.ts', '*.vue'],
    parser: '@typescript-eslint/parser', // Optional if you're using TypeScript
    rules: {
      // Your specific rules for .ts and .vue files
    },
  },
  // Other configurations can go here
]);
