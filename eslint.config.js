import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import { ParserOptions } from "@typescript-eslint/parser"; // This import is now correct for the parser

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser, // Define browser globals
    },
    ...pluginJs.configs.recommended, // Spread the recommended JS config
  },
  {
    files: ["**/*.ts"], // Target TypeScript files specifically
    languageOptions: {
      parser: "@typescript-eslint/parser", // Specify the TypeScript parser directly here
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Include the TypeScript plugin
    },
    rules: tseslint.configs.recommended.rules, // Apply TypeScript recommended rules directly
  },
  {
    files: ["**/*.vue"], // Target Vue files
    languageOptions: {
      parser: "@typescript-eslint/parser", // Use TypeScript parser for Vue files as well
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue, // Include the Vue plugin
    },
    rules: pluginVue.configs["vue3-recommended"].rules, // Apply Vue3 recommended rules directly
  },
];
