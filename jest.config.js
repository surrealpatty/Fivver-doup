module.exports = {
  // Set the test environment to jsdom, suitable for testing Vue components
  testEnvironment: 'jsdom',

  // Specify the transformers for Vue and JavaScript files
  transform: {
    '^.+\\.vue$': 'vue-jest', // Use vue-jest for .vue files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript and JSX files
  },

  // Define file extensions that Jest will look for
  moduleFileExtensions: ['js', 'vue', 'json'],

  // Define patterns for test file matching
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Match test files in __tests__ directory
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match any .spec.js or .test.js files
  ],

  // Enable coverage collection
  collectCoverage: true,

  // Set the directory for coverage reports
  coverageDirectory: 'coverage',

  // Optionally, you can exclude coverage for certain files or patterns
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules directory
    '<rootDir>/src/main.js', // Ignore the main entry point if necessary
  ],

  // Specify coverage thresholds (optional)
  coverageThreshold: {
    global: {
      branches: 80, // Set minimum coverage threshold for branches
      functions: 80, // Set minimum coverage threshold for functions
      lines: 80, // Set minimum coverage threshold for lines
      statements: 80, // Set minimum coverage threshold for statements
    },
  },

  // Setup files to run before each test (optional)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ensure this file exists or adjust the path accordingly
};
