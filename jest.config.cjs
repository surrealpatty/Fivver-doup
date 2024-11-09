module.exports = {
  moduleNameMapper: {
    // Map source paths for Jest to recognize imports
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',

    // Additional mappings to handle compiled paths in dist
    '^dist/middleware/(.*)$': '<rootDir>/dist/middleware/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/models/$1',
    '^dist/src/(.*)$': '<rootDir>/dist/src/$1',
    '^dist/controllers/(.*)$': '<rootDir>/dist/controllers/$1',
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
