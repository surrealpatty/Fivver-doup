module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript handling
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^dist/src/(.*)$': '<rootDir>/dist/src/$1',
    '^dist/controllers/(.*)$': '<rootDir>/dist/src/controllers/$1',
    '^dist/models/(.*)$': '<rootDir>/dist/src/models/$1',
    '^dist/middleware/(.*)$': '<rootDir>/dist/src/middleware/$1',
    '^dist/config/(.*)$': '<rootDir>/dist/src/config/$1',
    '^src/models/service$': '<rootDir>/src/models/service.js',
    '^dist/models/service$': '<rootDir>/dist/src/models/service.js',
    '^middleware/authMiddleware$': '<rootDir>/src/middleware/authMiddleware.js',
    '^dist/middleware/authMiddleware$': '<rootDir>/dist/src/middleware/authMiddleware.js',
    '^src/models/order$': '<rootDir>/src/models/order.js',
    '^dist/src/models/order$': '<rootDir>/dist/src/models/order.js',
    '^src/models/user$': '<rootDir>/src/models/user.js',
    '^dist/src/models/user$': '<rootDir>/dist/src/models/user.js',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files using babel-jest
  },
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)',  // Allows transforming specific node modules
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'dist/**/*.js',
    '!src/**/*.test.ts',  // Exclude test files from coverage
    '!dist/**/*.test.js',
  ],
  testTimeout: 30000,  // Adjust the timeout for tests if needed
  testMatch: [
    '**/src/**/__tests__/**/*.ts', // Tests in src directory
    '**/dist/**/__tests__/**/*.js', // Tests in dist directory
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],  // Ensure ts is included
};
