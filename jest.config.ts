import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

// Import the compiler options from your tsconfig.json file
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the test environment to Node.js

  // Transform settings for handling TypeScript and JavaScript files
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest', // Use ts-jest for transforming .ts and .tsx files
      {
        tsconfig: './tsconfig.json', // Path to your tsconfig.json
      },
    ],
  },

  // Resolve module aliases based on tsconfig paths
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/', // Prefix for the paths
  }),

  // Directories Jest will search for modules
  moduleDirectories: ['node_modules', 'src'], // Jest will look in these directories

  // Setup script after environment is configured
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Ensure setup.ts is configured correctly

  // Define the root directory for tests
  roots: ['<rootDir>/src'], // Tests will be under the 'src' folder

  // Enable code coverage collection
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage', // Directory for coverage reports
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', // Collect coverage from TypeScript files
    '!<rootDir>/src/**/*.d.ts', // Exclude declaration files
    '!<rootDir>/src/**/index.ts', // Exclude index files
  ],

  // File extensions to be recognized by Jest
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Recognize these file types

  // Treat .ts files as ES modules
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts as ES modules

  // Match test files by naming convention
  testMatch: ['<rootDir>/src/**/*.test.ts'], // Match test files under 'src'

  // Increase worker limit for better performance
  maxWorkers: 4, // Adjust based on system capacity

  // Enable verbose output for test results
  verbose: true, // Display detailed test results
};

export default config; // Export the configuration
