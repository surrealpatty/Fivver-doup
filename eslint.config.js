import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import parser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser, // TypeScript parser
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // Vue parser
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules, // Recommended Vue 3 rules
      'vue/no-unused-vars': 'warn',
    },
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.js',
      '**/setupEnvVars.ts',
      '**/test/**/*.ts',
      '**/test/**/*.js',
    ],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        process: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
