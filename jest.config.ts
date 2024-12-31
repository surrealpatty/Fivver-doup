import { pathsToModuleNameMapper } from 'ts-jest'; // Import pathsToModuleNameMapper from ts-jest
import { compilerOptions } from './tsconfig.json'; // Import compiler options from tsconfig.json

export default {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set the test environment to Node.js

  // Transform settings for handling TypeScript and JavaScript files
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json', // Path to your tsconfig.json
      },
    ],
  },

  // Resolve module aliases based on tsconfig paths
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),

  // Directories Jest will search for modules
  moduleDirectories: ['node_modules', 'src'],

  // Setup script after environment is configured
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Ensure setup.ts is configured correctly

  // Define the root directory for tests
  roots: ['<rootDir>/src'],

  // Enable code coverage collection
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage', // Directory for coverage reports
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', // Collect coverage from TypeScript files
    '!<rootDir>/src/**/*.d.ts', // Exclude declaration files
    '!<rootDir>/src/**/index.ts', // Exclude index files
  ],

  // File extensions to be recognized by Jest
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  // Treat .ts files as ES modules
  extensionsToTreatAsEsm: ['.ts'],

  // Match test files by naming convention
  testMatch: ['<rootDir>/src/**/*.test.ts'],

  // Increase worker limit for better performance
  maxWorkers: 4, // Adjust based on system capacity

  // Enable verbose output for test results
  verbose: true,
};
