import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";

// Import the TypeScript parser from the package
import pkg from "@typescript-eslint/parser";
const { parser } = pkg;

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
    files: ["**/*.{ts,tsx}"], // Target TypeScript files
    languageOptions: {
      parser, // Set the TypeScript parser here
    },
    plugins: {
      "@typescript-eslint": tseslint, // Include the TypeScript plugin
    },
    rules: tseslint.configs.recommended.rules, // Apply TypeScript recommended rules directly
  },
  {
    files: ["**/*.vue"], // Target Vue files
    languageOptions: {
      parser, // Use TypeScript parser for Vue files
    },
    plugins: {
      vue: pluginVue, // Include the Vue plugin
    },
    rules: pluginVue.configs["vue3-recommended"].rules, // Apply Vue3 recommended rules directly
  },
];
