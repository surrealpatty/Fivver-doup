module.exports = {
  moduleNameMapper: {
    // Map source paths for Jest to recognize imports
    '^src/(.*)$': '<rootDir>/src/$1',
    '^dist/(.*)$': '<rootDir>/dist/$1',

    // Add mappings to handle database.js for both src and dist
    '^src/config/database.js$': '<rootDir>/__mocks__/database.js', // Mock for source code
    '^dist/config/database.js$': '<rootDir>/__mocks__/database.js', // Mock for transpiled code
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files using Babel
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore transforming files in node_modules
  ],
  coverageDirectory: './coverage', // Directory for coverage reports
  collectCoverageFrom: [
    'src/**/*.js', // Collect coverage from source files
    '!src/**/*.test.js', // Exclude test files from coverage
  ],
  testTimeout: 30000, // Set test timeout to 30 seconds
  testMatch: [
    '**/src/**/__tests__/**/*.js', // Match test files in src directory
    '**/dist/**/__tests__/**/*.js', // Match test files in dist directory for compiled tests
  ],
  moduleFileExtensions: ['js', 'json', 'node'], // Specify extensions Jest should recognize
};
