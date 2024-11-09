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
    '^src/models/order$': '<rootDir>/src/models/order.js',
    '^dist/src/models/order$': '<rootDir>/dist/src/models/order.js',  // Ensuring correct mapping for order model

    // Ensure paths for other models are included (if needed)
    '^src/models/user$': '<rootDir>/src/models/user.js',
    '^dist/src/models/user$': '<rootDir>/dist/src/models/user.js',
    '^src/models/service$': '<rootDir>/src/models/service.js',
    '^dist/src/models/service$': '<rootDir>/dist/src/models/service.js',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Ensures .js files are transformed using babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)',  // Allows transforming specific node modules
  ],
  coverageDirectory: './coverage', // Directory where coverage reports are stored
  collectCoverageFrom: [
    'src/**/*.js',
    'dist/**/*.js',
    '!src/**/*.test.js',  // Exclude test files from coverage
    '!dist/**/*.test.js',
  ],
  testTimeout: 30000,  // Adjust the timeout for tests if needed
  testMatch: [
    '**/src/**/__tests__/**/*.js', // Tests in src directory
    '**/dist/**/__tests__/**/*.js', // Tests in dist directory
  ],
  moduleFileExtensions: ['js', 'json', 'node'],  // File extensions Jest will recognize
};
