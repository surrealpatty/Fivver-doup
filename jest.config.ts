import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript
  testEnvironment: 'node', // Set the testing environment to Node.js
  maxWorkers: process.env.CI ? 2 : 1, // Optimize workers based on CI environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1', // Alias for @models
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1', // Alias for @controllers
    '^@services/(.*)$': '<rootDir>/src/services/$1', // Alias for @services
    '^@utils/(.*)$': '<rootDir>/src/utils/$1', // Alias for @utils (if applicable)
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Use project-specific tsconfig.json
      isolatedModules: true, // Enable isolated modules for faster compilation
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Order file extensions for resolution
  transformIgnorePatterns: ['/node_modules/'], // Skip transformations for node_modules
  setupFiles: ['<rootDir>/jest.setup.ts'], // Setup file for initial mocks or global setups
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore compiled files and node_modules
  testMatch: ['**/src/**/*.test.(ts|tsx)'], // Locate test files in the src folder
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM (adjust for compatibility)
  restoreMocks: true, // Restore mocks after each test
  collectCoverage: true, // Collect test coverage (optional)
  coverageDirectory: '<rootDir>/coverage', // Directory for coverage reports
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude these from coverage
  coverageReporters: ['text', 'lcov'], // Report coverage in text and lcov formats
};

export default config;
