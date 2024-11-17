import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'node',  // Set the test environment to node (suitable for backend tests)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],  // Include node extension for modules
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],  // Use ts-jest to transform TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Specify a setup file for any test configuration
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Specify the correct tsconfig to use for ts-jest transformations
    },
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',  // Correctly map models to src/models
    '^@/(.*)$': '<rootDir>/src/$1',  // Map "@" to "src" folder for other paths
    '^~/(.*)$': '<rootDir>/src/$1',  // Optional: If you use "~" as an alias for the src directory
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',  // Collect coverage from TypeScript files only
    '!src/**/*.d.ts',  // Exclude declaration files from coverage
  ],
  coverageDirectory: 'coverage',  // Specify the directory where coverage reports will be stored
  coverageProvider: 'v8',  // Use v8 for faster code coverage collection
  testPathIgnorePatterns: [
    '/node_modules/',  // Ignore node_modules during tests
    '/dist/',  // Exclude dist folder to avoid running tests on transpiled files
  ],
  verbose: true,  // Enable verbose output to see detailed test results
};

export default config;
