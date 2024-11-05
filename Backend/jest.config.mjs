export default {
  // Set the test environment to jsdom for testing Vue components
  testEnvironment: 'jsdom',

  // Specify how to transform different file types
  transform: {
      '^.+\\.vue$': 'vue-jest', // Transform Vue files
      '^.+\\.(js|jsx)$': 'babel-jest', // Transform JS/JSX files
  },

  // Specify the module file extensions
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],

  // Patterns for test files
  testMatch: [
      '**/__tests__/**/*.[jt]s?(x)', // Match any test files in __tests__ directory
      '**/?(*.)+(spec|test).[jt]s?(x)', // Match any spec or test files
  ],

  // Enable coverage collection
  collectCoverage: true,

  // Specify which files to collect coverage from
  collectCoverageFrom: [
      'src/**/*.{js,vue}', // Collect coverage for all JS and Vue files
      '!src/**/*.spec.js', // Exclude spec files
      '!src/main.js', // Exclude main entry file
      '!src/**/index.js', // Exclude index files
  ],

  // Directory for coverage reports
  coverageDirectory: 'coverage',

  // Patterns to ignore for coverage reports
  coveragePathIgnorePatterns: [
      '/node_modules/', // Ignore node_modules
      '<rootDir>/src/main.js', // Ignore main.js
  ],

  // Uncomment below if you create a setupTests.js file in src
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Enable verbose output
  verbose: true,

  // Set test timeout (in milliseconds)
  testTimeout: 30000,
};
