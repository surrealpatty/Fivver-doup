module.exports = {
    setupFilesAfterEnv: [
      "<rootDir>/jest.setup.js",  // Make sure setup file is loaded after environment setup
    ],
    testEnvironment: "jest-environment-jsdom",  // Use jsdom for DOM-like environment
    moduleFileExtensions: [
      "js",
      "ts",
      "json",
      "vue",
      "node",
    ],
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",  // Transform Vue files with vue3-jest
      "^.+\\.ts$": "ts-jest",          // Transform TypeScript files with ts-jest
      "^.+\\.jsx?$": "babel-jest",     // Transform JS/JSX files with babel-jest
    },
    verbose: true,                      // Verbose test output
    moduleNameMapper: {
      // This is for resolving paths or any Vue component imports that Jest may have trouble with
      "^@/(.*)$": "<rootDir>/src/$1",  // Adjust this based on how you import Vue components
    },
    globals: {
      "vue-jest": {
        tsConfig: "<rootDir>/tsconfig.json",  // Make sure tsconfig is correctly used for Vue files
      },
    },
    transformIgnorePatterns: [
      // Ignore node_modules for transformation except those containing Vue code
      "/node_modules/(?!@vue|vue3|@vue/test-utils).+\\.js$",
    ],
  };
  