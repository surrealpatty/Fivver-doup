import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Specify recognized module file extensions
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],

  // Use ts-jest for TypeScript transformation and babel-jest for JavaScript
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to handle TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to handle JavaScript files
  },

  // Ignore transformations for node_modules except specific ESM packages
  transformIgnorePatterns: [
    '/node_modules/(?!specific-esm-module|another-esm-package)/',
  ],

  // Set Node.js as the test environment
  testEnvironment: 'node',

  // Specify a global teardown script (update path if necessary)
  globalTeardown: '<rootDir>/src/globalTeardown.ts',

  // Use ts-jest preset for advanced TypeScript support
  preset: 'ts-jest',

  // Include setup files if required, otherwise leave as an empty array
  setupFiles: [],

  // Include the setup file for additional environment configuration
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Path to the setup file

  // Automatically clear mocks before each test
  clearMocks: true,

  // Collect coverage data
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8',

  // Configure ts-jest options for better performance
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },

  // Map module aliases for TypeScript path mappings
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Example alias mapping
  },

  // Watch for changes only in the specified directories
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
};

export default config;
