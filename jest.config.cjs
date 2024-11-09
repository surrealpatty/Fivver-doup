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
    '^dist/controllers/(.*)$': '<rootDir>/dist/src/controllers/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/src/models/$1',
    '^dist/middleware/(.*)$': '<rootDir>/dist/src/middleware/$1',
    '^dist/config/(.*)$': '<rootDir>/dist/src/config/$1',

    // Ensure database.js paths are mapped for both src and dist
    '^src/config/database.js$': '<rootDir>/src/config/database.js',
    '^dist/src/config/database.js$': '<rootDir>/dist/src/config/database.js',

    // Explicit mappings for src/models/user
    '^src/models/user$': '<rootDir>/src/models/user.js',
    '^dist/src/models/user$': '<rootDir>/dist/src/models/user.js',
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
