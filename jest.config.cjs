module.exports = {
  moduleNameMapper: {
    '^middleware/(.*)$': '<rootDir>/dist/middleware/$1',
    '^models/(.*)$': '<rootDir>/dist/models/$1', // Ensure this maps correctly to dist/models
    '^src/(.*)$': '<rootDir>/dist/src/$1',
    '^controllers/(.*)$': '<rootDir>/dist/controllers/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Ensure babel is transforming the JavaScript files correctly
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ensure node_modules are ignored unless specifically needed
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js', // Collect coverage from source files (not dist)
    '!src/**/*.test.js', // Exclude test files from coverage
  ],
  testTimeout: 30000, // Optional: Increase the timeout if tests are taking longer than expected
};
