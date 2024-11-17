import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Apply configuration to all JS, TS, Vue, and related files
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser, // Define browser globals
    },
    ...pluginJs.configs.recommended,
  },
  // Apply TypeScript linting rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
    ],
    parser: tseslint.parser, // Ensure TypeScript files are parsed with TypeScript parser
  },
  // Vue linting configuration
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser, // Use TypeScript parser for Vue files
      },
    },
    plugins: {
      vue: pluginVue,
    },
    extends: [
      // Use the recommended Vue ESLint config
      "plugin:vue/vue3-recommended",
    ],
  },
];
