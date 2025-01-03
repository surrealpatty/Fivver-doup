import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Specify the preset for TypeScript
  preset: 'ts-jest',

  // Define the test environment
  testEnvironment: 'node', // Or 'jsdom' if testing client-side code
  
  // Enable support for decorators (e.g., @BeforeCreate)
  globals: {
    'ts-jest': {
      isolatedModules: true, // Enables faster testing when possible
      tsconfig: 'tsconfig.jest.json', // Use the Jest-specific tsconfig
    },
  },

  // Handle different file extensions (including .ts and .tsx)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],

  // Use ts-jest for TypeScript files
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for .ts files
    '^.+\\.tsx$': 'ts-jest', // Use ts-jest for .tsx files
    '^.+\\.js$': 'babel-jest', // Optionally use babel-jest for .js files
  },

  // Specify the location of the setup file for global setup/teardown
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Corrected to use `setupFilesAfterEnv`

  // Optional: Set up coverage collection
  collectCoverage: true, // Collect coverage reports for tests
  collectCoverageFrom: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'], // Specify files to collect coverage from
  
  // Optional: Additional Jest settings (custom test match, etc.)
  testMatch: ['**/*.test.ts', '**/*.test.tsx'], // Match test files
};

export default config;
