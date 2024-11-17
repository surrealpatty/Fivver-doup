import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import parser from "@typescript-eslint/parser"; // Default import for the TypeScript parser

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Define browser globals
        process: "readonly", // Add Node.js process as readonly
        require: "readonly", // Add Node.js require as readonly
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Spread the recommended JS rules
    },
  },
  {
    files: ["**/*.ts"], // Target TypeScript files specifically
    languageOptions: {
      parser, // Use TypeScript parser here
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Include TypeScript plugin
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Apply TypeScript recommended rules directly
    },
  },
  {
    files: ["**/*.vue"], // Target Vue files
    languageOptions: {
      parser, // Use TypeScript parser for Vue files as well
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      vue: pluginVue, // Include Vue plugin
    },
    rules: {
      ...pluginVue.configs["vue3-recommended"].rules, // Apply Vue3 recommended rules directly
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.js", "**/setupEnvVars.ts", "**/test/**/*.ts", "**/test/**/*.js"], // Target test files specifically
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
      "no-undef": "off", // Disable no-undef for Jest and Node globals
    },
  },
];
