module.exports = {
  // Set the test environment to jsdom, suitable for testing Vue components
  testEnvironment: 'jsdom',

  // Specify the transformers for Vue and JavaScript files
  transform: {
    '^.+\\.vue$': 'vue3-jest', // Use vue3-jest for .vue files
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript and JSX files
  },

  // Define file extensions that Jest will look for
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],

  // Define patterns for test file matching
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Match test files in __tests__ directory
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match any .spec.js or .test.js files
  ],

  // Enable coverage collection
  collectCoverage: true,

  // Specify which files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{js,vue}', // Collect coverage from all .js and .vue files in the src directory
    '!src/**/*.spec.js', // Exclude test files from coverage
    '!src/main.js', // Exclude the main entry point if necessary
    '!src/**/index.js', // Exclude index files in subdirectories if necessary
  ],

  // Set the directory for coverage reports
  coverageDirectory: 'coverage',

  // Exclude coverage for certain files or patterns
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules directory
    '<rootDir>/src/main.js', // Ignore the main entry point if necessary
  ],

  // Setup files to run before each test (optional)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ensure this file exists or adjust the path accordingly
};
