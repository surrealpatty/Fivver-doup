import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript testing
  testEnvironment: 'node', // Set Node.js as the test environment

  // Transform TypeScript files with ts-jest and JavaScript files with babel-jest
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for .ts files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for .js files
  },

  // Ignore transformations for node_modules except ESM-compatible packages
  transformIgnorePatterns: [
    '/node_modules/(?!specific-esm-module|another-esm-package)/',
  ],

  // Include setup files for environment configuration
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Clear mocks before each test to ensure clean state
  clearMocks: true,

  // Enable coverage collection and specify the output directory
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8', // Use the v8 coverage provider for better performance

  // Configure ts-jest options for isolated module testing
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },

  // Resolve module paths for aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Example alias for paths starting with @/
  },

  // Watch only relevant paths for changes
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],

  // Recognize file extensions for modules
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],

  // Limit the number of workers if you face resource issues
  maxWorkers: 4, 
};

export default config;
