import globals from "globals";
import { Linter } from "eslint";  // Import Linter from ESLint

/** @type {Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Add browser globals
        process: "readonly", // Add Node.js process as readonly
        require: "readonly", // Add Node.js require as readonly
      },
    },
    rules: {
      // Spread the recommended JS rules
      "no-console": "off",
    },
  },
  {
    files: ["**/*.ts"], // Specific rules for TypeScript files
    languageOptions: {
      parser: "@typescript-eslint/parser", // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module", // Enable module system for TypeScript
      },
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
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
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
