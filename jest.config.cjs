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
    '^dist/controllers/(.*)$': '<rootDir>/dist/src/controllers/$1', // Fixed to reference dist/src
    '^dist/models/(.*)$': '<rootDir>/dist/src/models/$1', // Fixed to reference dist/src
    '^dist/middleware/(.*)$': '<rootDir>/dist/src/middleware/$1', // Fixed to reference dist/src
    '^dist/config/(.*)$': '<rootDir>/dist/src/config/$1', // Fixed to reference dist/src

    // Specific mappings for fixed paths (including userController, services, and authMiddleware)
    '^dist/src/controllers/userController$': '<rootDir>/dist/src/controllers/userController',
    '^dist/src/models/services$': '<rootDir>/dist/src/models/services',
    '^dist/src/middleware/authMiddleware$': '<rootDir>/dist/src/middleware/authMiddleware',

    // Ensure database.js paths are mapped for both src and dist
    '^src/config/database.js$': '<rootDir>/src/config/database.js',
    '^dist/src/config/database.js$': '<rootDir>/dist/src/config/database.js',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Transpiling JavaScript with Babel
  },
  transformIgnorePatterns: ['/node_modules/'], // Ignore transforming files in node_modules
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js', // Exclude test files from coverage
  ],
  testTimeout: 30000, // Increase the test timeout if necessary
  testMatch: [
    '**/src/**/__tests__/**/*.js', // Tests in src folder
    '**/dist/**/__tests__/**/*.js', // Tests in dist folder
  ],
  moduleFileExtensions: ['js', 'json', 'node'], // File extensions to recognize
};
