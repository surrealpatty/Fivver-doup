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

    // Explicit mocks (to avoid redundancy)
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^dist/src/controllers/userController$': '<rootDir>/dist/src/controllers/userController', // Fixed mapping for userController
    '^dist/src/models/services$': '<rootDir>/dist/src/models/services', // Fixed mapping for services
    '^dist/src/middleware/authMiddleware$': '<rootDir>/dist/src/middleware/authMiddleware', // Fixed mapping for authMiddleware

    // Ensure database.js paths are mapped
    '^src/config/database.js$': '<rootDir>/src/config/database.js',
    '^dist/src/config/database.js$': '<rootDir>/dist/src/config/database.js', // For dist paths
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
