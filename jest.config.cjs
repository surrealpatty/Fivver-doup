module.exports = {
  moduleNameMapper: {
    // Map the modules to the dist folder, assuming the source is under 'src'
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1', // Adjust for the original src location
    '^models/(.*)$': '<rootDir>/src/models/$1', // Adjust for the original src location
    '^src/(.*)$': '<rootDir>/src/$1', // Map src directly
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1', // Adjust for the original src location
  },
  testEnvironment: 'node', // Keep the test environment set to node for backend testing
  transform: {
    '^.+\\.js$': 'babel-jest', // Ensure babel is transforming the JavaScript files correctly
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore node_modules during transformation
  ],
  coverageDirectory: './coverage', // Keep coverage reports here
  collectCoverageFrom: [
    'src/**/*.js', // Collect coverage from source files (not dist)
    '!src/**/*.test.js', // Exclude test files from coverage
  ],
  testTimeout: 30000, // Optional: Increase the timeout if tests are taking longer than expected
  // Optionally specify the test path pattern if you want to target specific files
  testMatch: ['**/src/**/__tests__/**/*.js'],
};
