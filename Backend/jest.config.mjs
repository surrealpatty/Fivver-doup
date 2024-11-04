// jest.config.js
export default {
  // Set the test environment to jsdom
  testEnvironment: 'jsdom',

  // Specify the transformers for Vue and JavaScript files
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Define file extensions that Jest will look for
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],

  // Define patterns for test file matching
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Enable coverage collection
  collectCoverage: true,

  // Specify which files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/*.spec.js',
    '!src/main.js',
    '!src/**/index.js',
  ],

  // Set the directory for coverage reports
  coverageDirectory: 'coverage',

  // Exclude coverage for certain files or patterns
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/main.js',
  ],

  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Additional options for better debugging and reporting
  verbose: true,
  testTimeout: 30000,
};
