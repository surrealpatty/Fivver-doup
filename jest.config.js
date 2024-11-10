module.exports = {
  // Use jsdom as the test environment, suitable for DOM-related tests
  testEnvironment: 'jest-environment-jsdom',

  // Specify the test files to be matched by Jest
  testMatch: [
    "**/src/test/**/*.test.{js,ts}",   // Match .test.js and .test.ts files under src/test
    "**/src/tests/**/*.test.{js,ts}",  // Match .test.js and .test.ts files under src/tests
    "**/src/test/**/*.spec.{js,ts}",   // Match .spec.js and .spec.ts files under src/test
    "**/src/tests/**/*.spec.{js,ts}",  // Match .spec.js and .spec.ts files under src/tests
  ],

  // Transform files before running tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest',          // Use ts-jest for .ts and .tsx files
    '^.+\\.js$': 'babel-jest',         // Use babel-jest for .js files
  },

  // Exclude node_modules from transformations except sequelize if needed
  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",
  ],

  // Module aliasing for imports
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Resolve src/ imports to src directory
    '^dist/(.*)$': '<rootDir>/dist/$1', // Resolve dist/ imports to dist directory
  },

  // Global setup file for additional configuration
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Include files for coverage, excluding the test directories
  collectCoverageFrom: [
    "src/**/*.{js,ts}",               // Include .js and .ts files in src for coverage
    "!src/test/**",                    // Exclude src/test and src/tests
    "!src/tests/**",
  ],

  // Clear mocks automatically between tests
  clearMocks: true,

  // Watch mode configuration for automatic re-runs on changes
  watchman: true,
};
