module.exports = {
  moduleNameMapper: {
    // Map for src paths
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',

    // Map for dist paths (transpiled files in dist/src)
    '^dist/src/(.*)$': '<rootDir>/dist/src/$1',
    '^dist/controllers/(.*)$': '<rootDir>/dist/src/controllers/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/src/models/$1',
    '^dist/middleware/(.*)$': '<rootDir>/dist/src/middleware/$1',
    '^dist/config/(.*)$': '<rootDir>/dist/src/config/$1',

    // Specific mappings for individual modules
    '^src/models/service$': '<rootDir>/src/models/service.js',
    '^dist/models/service$': '<rootDir>/dist/src/models/service.js',
    '^middleware/authMiddleware$': '<rootDir>/src/middleware/authMiddleware.js',
    '^dist/middleware/authMiddleware$': '<rootDir>/dist/src/middleware/authMiddleware.js',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)',
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    'dist/**/*.js',
    '!src/**/*.test.js',
    '!dist/**/*.test.js',
  ],
  testTimeout: 30000,
  testMatch: [
    '**/src/**/__tests__/**/*.js',
    '**/dist/**/__tests__/**/*.js',
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
};
