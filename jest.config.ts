import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the testing environment to Node.js
  maxWorkers: process.env.CI ? 2 : 1, // Optimize workers for CI environments
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }], // Transform TypeScript files using ts-jest and tsconfig.json
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1', // Map @models alias to src/models
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1', // Map @controllers alias to src/controllers
    '^@services/(.*)$': '<rootDir>/src/services/$1', // Map @services alias to src/services
    '^@utils/(.*)$': '<rootDir>/src/utils/$1', // Map @utils alias to src/utils
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Resolve these file extensions in order
  transformIgnorePatterns: ['/node_modules/'], // Ignore transformations for node_modules
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Specify setup file for mocks and globals
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist directories
  testMatch: ['**/src/**/*.test.(ts|tsx)'], // Match test files in the src folder
  extensionsToTreatAsEsm: ['.ts'], // Treat TypeScript files as ESM
  restoreMocks: true, // Automatically restore mocks after each test
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: '<rootDir>/coverage', // Directory for storing coverage reports
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude these from coverage
  coverageReporters: ['text', 'lcov'], // Generate coverage reports in text and lcov formats
  verbose: true, // Enable verbose output for test results
  bail: 1, // Stop after the first failure (useful for CI)
  globalSetup: '<rootDir>/src/test/setup.ts', // Correct path to global setup script for database connection
  globalTeardown: '<rootDir>/src/test/teardown.ts', // Correct path to global teardown script for database connection
};

export default config;
