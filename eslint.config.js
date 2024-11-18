import globals from 'globals';
import { Linter } from 'eslint';  // Import Linter from ESLint
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import parser from '@typescript-eslint/parser'; // Use TypeScript parser correctly
import vueParser from 'vue-eslint-parser'; // Vue parser

/** @type {Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', // Enable module system for JS, TS, and Vue
      globals: {
        ...globals.browser, // Add browser globals
        process: 'readonly', // Add Node.js process as readonly
        require: 'readonly', // Add Node.js require as readonly
      },
      parser: 'babel-eslint', // Use babel-eslint parser for JS
    },
    plugins: {
      '@eslint/js': pluginJs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Spread the recommended JS rules
    },
  },
  {
    files: ['**/*.ts'], // Specific rules for TypeScript files
    languageOptions: {
      parser, // Use the correct TypeScript parser
      ecmaVersion: 2020,
      sourceType: 'module', // Enable module system for TypeScript
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Warn for unused variables in TypeScript
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Turn off rule for explicit return types
      '@typescript-eslint/no-explicit-any': 'off', // Optionally allow `any` type (adjust as per your team's preference)
    },
  },
  {
    files: ['**/*.vue'], // Specific rules for Vue files
    languageOptions: {
      parser: vueParser, // Use Vue parser to handle Vue files
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      'eslint-plugin-vue': pluginVue, // Explicitly include the vue plugin
    },
    rules: {
      'vue/no-unused-vars': 'warn',  // Warn for unused variables in Vue files
      'vue/require-default-prop': 'off', // Optionally disable requiring default props (adjust as needed)
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/setupEnvVars.ts', '**/test/**/*.ts', '**/test/**/*.js'], // Specific rules for test files
    languageOptions: {
      globals: {
        jest: 'readonly', // Declare Jest globals as readonly for test files
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        process: 'readonly', // Add Node.js process for setupEnvVars.ts
        require: 'readonly', // Add Node.js require for test files
      },
    },
    rules: {
      'no-undef': 'off', // Disable `no-undef` in test files
    },
  },
];
