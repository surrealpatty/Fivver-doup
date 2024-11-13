module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",  // Ensure setup file is loaded after environment setup
  ],
  testEnvironment: "jsdom",  // Shortened test environment specification (equivalent to jest-environment-jsdom)
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue",
    "node",
  ],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",  // Transform .vue files with vue3-jest
    "^.+\\.ts$": "ts-jest",          // Transform .ts files with ts-jest
    "^.+\\.jsx?$": "babel-jest",     // Transform JS/JSX files with babel-jest
  },
  verbose: true,                      // Verbose test output for detailed results
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Map @ to the src directory for importing
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Ensure tsconfig.json is used for TypeScript transformation
    },
    "vue-jest": {
      tsConfig: "<rootDir>/tsconfig.json",  // Use tsconfig.json for vue-jest transformation (for Vue 3)
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@vue|vue3|@vue/test-utils)/)",  // Allow transformation of Vue-related dependencies in node_modules
  ],
  collectCoverage: true,                    // Enable coverage collection if needed
  collectCoverageFrom: [
    "src/**/*.{js,ts,vue}",                 // Collect coverage from JS, TS, and Vue files in src
    "!src/main.ts",                         // Exclude main entry file (often setup code)
    "!src/router/**",                       // Exclude router files if you use Vue Router
    "!src/store/**",                        // Exclude store files if using Vuex
  ],
};
