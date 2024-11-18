import globals from "globals";
import { Linter } from "eslint";  // Import Linter from ESLint
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import parser from "@typescript-eslint/parser"; // Default import for the TypeScript parser

/** @type {Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module", // Enable module system for JS, TS, and Vue
      globals: {
        ...globals.browser, // Add browser globals
        process: "readonly", // Add Node.js process as readonly
        require: "readonly", // Add Node.js require as readonly
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Spread the recommended JS rules
    },
  },
  {
    files: ["**/*.ts"], // Specific rules for TypeScript files
    languageOptions: {
      parser: "@typescript-eslint/parser", // Use TypeScript parser
      ecmaVersion: 2020,
      sourceType: "module", // Enable module system for TypeScript
    },
    plugins: ["@typescript-eslint"],  // Use the TypeScript plugin
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables in TypeScript
    },
  },
  {
    files: ["**/*.vue"], // Specific rules for Vue files
    languageOptions: {
      parser: "@typescript-eslint/parser",  // Use TypeScript parser for Vue
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: ["eslint-plugin-vue"],  // Use Vue plugin
    rules: {
      "vue/no-unused-vars": "warn",  // Warn for unused variables in Vue files
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.js", "**/setupEnvVars.ts", "**/test/**/*.ts", "**/test/**/*.js"], // Specific rules for test files
    languageOptions: {
      globals: {
        jest: "readonly", // Declare Jest globals as readonly for test files
        describe: "readonly", 
        it: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        process: "readonly", // Add Node.js process for setupEnvVars.ts
        require: "readonly", // Add Node.js require for test files
      },
    },
    rules: {
      "no-undef": "off", // Disable `no-undef` in test files
    },
  },
];
