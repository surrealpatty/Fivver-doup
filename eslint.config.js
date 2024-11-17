import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";

// Use default import for the TypeScript parser due to CommonJS compatibility
import pkg from "@typescript-eslint/parser";
const { parser } = pkg;

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Apply configuration to all JS, TS, Vue, and related files
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser, // Define browser globals
    },
    ...pluginJs.configs.recommended, // Spread the recommended JS config
  },
  // Apply TypeScript linting rules
  {
    files: ["**/*.{ts,tsx}"],
    parser, // Use the TypeScript parser
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: tseslint.configs.recommended.rules, // Include the recommended TypeScript rules directly
  },
  // Vue linting configuration
  {
    files: ["**/*.vue"],
    parser, // Use TypeScript parser for Vue files
    plugins: {
      vue: pluginVue,
    },
    rules: pluginVue.configs["vue3-recommended"].rules, // Include Vue rules directly
  },
];
