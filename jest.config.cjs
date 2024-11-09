module.exports = {
  moduleNameMapper: {
    // Source paths
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',

    // Dist paths (post-transpilation)
    '^dist/src/(.*)$': '<rootDir>/dist/src/$1',
    '^dist/controllers/(.*)$': '<rootDir>/dist/controllers/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/models/$1',
    '^dist/middleware/(.*)$': '<rootDir>/dist/middleware/$1',
    '^dist/config/(.*)$': '<rootDir>/dist/config/$1', // Added dist config mapping

    // Mapping database.js correctly for both src and dist paths
    '^src/config/database.js$': '<rootDir>/__mocks__/database.js',
    '^dist/config/database.js$': '<rootDir>/__mocks__/database.js',

    // Explicit mocks
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'], // Ignore transforming files in node_modules
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js', // Exclude test files from coverage
  ],
  testTimeout: 30000,
  testMatch: [
    '**/src/**/__tests__/**/*.js',
    '**/dist/**/__tests__/**/*.js',
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
};
