import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for transpiling TypeScript
  testEnvironment: 'node', // Node.js environment for testing
  maxWorkers: process.env.CI ? 2 : 1, // Adjust workers for CI/CD
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }], // Transpile TypeScript files
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1', // Map for @config
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Recognized file extensions
  transformIgnorePatterns: ['/node_modules/'], // Ignore transformations for node_modules
  setupFiles: ['dotenv/config'], // Load environment variables
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Custom Jest setup
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude paths from tests
  testMatch: ['**/src/**/*.test.(ts|tsx)'], // Match test files in the src directory
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM
  restoreMocks: true, // Automatically restore mocks
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: '<rootDir>/coverage', // Directory for coverage reports
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these paths for coverage
  coverageReporters: ['text', 'lcov'], // Report formats for coverage
  verbose: process.env.NODE_ENV === 'test', // Verbose output in test environment
  bail: 1, // Stop after the first test failure
  globalSetup: '<rootDir>/src/test/globalSetup.ts', // Path to global setup file
  globalTeardown: '<rootDir>/src/test/teardown.ts', // Path to global teardown file
  cacheDirectory: '<rootDir>/.jest-cache', // Cache directory
};

export default config;
