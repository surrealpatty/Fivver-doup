module.exports = {
  // Use jsdom as the test environment for DOM manipulation in tests
  testEnvironment: 'jest-environment-jsdom',

  // Specify the test files to be matched by Jest
  testMatch: [
    "**/src/tests/**/*.test.{js,ts}",  // Match both .test.js and .test.ts files under the src/tests folder
    "**/src/tests/**/*.spec.{js,ts}",  // Match both .spec.js and .spec.ts files under the src/tests folder
  ],

  // Specify how files are transformed before running tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest to handle .ts and .tsx files
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to handle .js files
  },

  // Specify which modules should not be transformed by Jest
  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",  // Allow sequelize (and other necessary modules) to be transformed
  ],

  // Module name mapping for easier imports in tests
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Resolve imports that begin with 'src/' to the src directory
    '^dist/(.*)$': '<rootDir>/dist/$1',  // Resolve imports that begin with 'dist/' to the dist directory
  },

  // Include setup file for global configuration (e.g., jest-dom, mocks)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],  // This will load jest.setup.js after the environment is set up

  // Specify which files should be collected for coverage analysis
  collectCoverageFrom: [
    "src/**/*.{js,ts}",  // Collect coverage from all JavaScript and TypeScript files under src
    "!src/tests/**",      // Exclude the tests directory from coverage collection
  ],

  // Optional: Add the following if you want to automatically clear mocks between tests
  clearMocks: true,  // Automatically clears mock calls between tests

  // Optional: Watch mode for test re-runs on file changes
  watchman: true,
};
