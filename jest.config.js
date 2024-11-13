module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",  // Ensure setup file is loaded after environment setup
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
    "^@/(.*)$": "<rootDir>/src/$1",  // Resolve paths for Vue components or other files
  },
  globals: {
    "vue-jest": {
      tsconfig: "<rootDir>/tsconfig.json",  // Use tsconfig.json for vue-jest transformation
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@vue|vue3|@vue/test-utils).+\\.js$",  // Allow transformation of certain node_modules
  ],
};
