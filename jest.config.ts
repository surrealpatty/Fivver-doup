import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'node',  // Set the test environment to node (suitable for backend tests)
  moduleFileExtensions: ['ts', 'js', 'json'],  // Only include TypeScript and JavaScript file extensions
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],  // Use ts-jest to transform TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Specify a setup file for any test configuration
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // Specify the tsconfig to use for ts-jest transformations
    },
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
  },  
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',  // Collect coverage from TypeScript files only
    '!src/**/*.d.ts',  // Exclude declaration files from coverage
  ],
  coverageDirectory: 'coverage',  // Specify the directory where coverage reports will be stored
  coverageProvider: 'v8',  // Use v8 for faster code coverage collection
  testPathIgnorePatterns: [
    '/node_modules/',  // Ignore node_modules during tests
  ],
  verbose: true,  // Enable verbose output to see detailed test results
};

export default config;
