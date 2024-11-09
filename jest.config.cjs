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
    '^dist/config/(.*)$': '<rootDir>/__mocks__/database.js', // Mock for database.js in dist

    // Explicit mocks
    '^src/config/database.js$': '<rootDir>/__mocks__/database.js', // Mock for database.js in src
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore transforming files in node_modules
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  testTimeout: 30000,
  testMatch: [
    '**/src/**/__tests__/**/*.js',
    '**/dist/**/__tests__/**/*.js',
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
};
