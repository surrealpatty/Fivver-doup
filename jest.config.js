module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript transformations
    testEnvironment: 'jsdom', // Set the test environment to jsdom for browser-like behavior
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Add file extensions to be considered by Jest
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for .ts and .tsx files
      '^.+\\.vue$': 'vue3-jest', // Use vue3-jest for .vue files
    },
    collectCoverage: true, // Collect coverage information
    coverageDirectory: 'coverage', // Store coverage reports in this directory
    coverageReporters: ['text', 'lcov'], // Text-based and LCOV coverage reports
    testMatch: [
      '**/src/**/*.test.ts',
      '**/src/**/*.spec.ts',
      '**/src/**/*.test.js',
      '**/src/**/*.spec.js',
    ], // Match test files in src folder
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude node_modules and dist from coverage
    testTimeout: 30000, // Set a 30-second timeout for each test
  };
  