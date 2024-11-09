module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript handling
  testEnvironment: 'node',
  moduleNameMapper: {
    // Resolving paths in src/ directory
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',

    // Adjusting dist models to resolve to src
    '^dist/models/user$': '<rootDir>/src/models/user.js',  // Correctly map dist/models/user to src/models/user.js

    // Same for other models, services, etc.
    '^dist/models/service$': '<rootDir>/src/models/service.js', // Map dist models to src
    '^middleware/authMiddleware$': '<rootDir>/src/middleware/authMiddleware.js',
    '^dist/middleware/authMiddleware$': '<rootDir>/src/middleware/authMiddleware.js', // Map dist middleware to src
    '^src/models/order$': '<rootDir>/src/models/order.js',
    '^dist/models/order$': '<rootDir>/src/models/order.js', // Map dist models to src
    '^src/models/user$': '<rootDir>/src/models/user.js',
    '^dist/models/user$': '<rootDir>/src/models/user.js', // Map dist models to src
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
