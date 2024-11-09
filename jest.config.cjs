module.exports = {
  moduleNameMapper: {
    // Map for src paths
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',

    // Map for dist paths
    '^dist/src/(.*)$': '<rootDir>/dist/$1',
    '^dist/controllers/(.*)$': '<rootDir>/dist/controllers/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/models/$1',
    '^dist/middleware/(.*)$': '<rootDir>/dist/middleware/$1',
    '^dist/config/(.*)$': '<rootDir>/dist/config/$1',

    // Specific path mappings for `userController`, `services`, `authMiddleware`, and `database`
    '^src/config/database.js$': '<rootDir>/src/config/database.js',
    '^dist/config/database.js$': '<rootDir>/dist/config/database.js',
    '^src/models/user$': '<rootDir>/src/models/user',
    '^dist/models/user$': '<rootDir>/dist/models/user',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Transpiles JavaScript with Babel for testing
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)', // Customize if there are specific modules to transform
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',          // Include coverage for src files
    'dist/**/*.js',         // Include coverage for dist files
    '!src/**/*.test.js',    // Exclude test files from src coverage
    '!dist/**/*.test.js',   // Exclude test files from dist coverage
  ],
  testTimeout: 30000,
  testMatch: [
    '**/src/**/__tests__/**/*.js',  // Match test files in src
    '**/dist/**/__tests__/**/*.js', // Match test files in dist
  ],
  moduleFileExtensions: ['js', 'json', 'node'], // Recognized extensions
};
