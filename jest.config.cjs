module.exports = {
  moduleNameMapper: {
    // Adjust the mappings to point to the correct src paths
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  testTimeout: 30000,
  testMatch: [
    '**/src/**/__tests__/**/*.js', // Match tests under the src directory
    '**/dist/__tests__/**/*.js',   // Match tests under the dist directory (where your compiled tests are)
  ],
};
