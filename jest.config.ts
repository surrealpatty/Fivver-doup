import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Specify the preset for TypeScript
  preset: 'ts-jest',

  // Define the test environment
  testEnvironment: 'node', // Use 'node' for server-side tests (you can switch to 'jsdom' for browser-related tests)

  // Enable support for decorators (e.g., @BeforeCreate) if you're using them
  globals: {
    'ts-jest': {
      isolatedModules: true, // Enables faster testing when possible (by isolating modules)
      tsconfig: 'tsconfig.jest.json', // Specify the Jest-specific tsconfig for TypeScript
    },
  },

  // Handle different file extensions (including .ts and .tsx)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],

  // Use ts-jest for TypeScript files and Babel for JavaScript files
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }], // Ensure ts-jest uses the Jest-specific tsconfig
    '^.+\\.tsx$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }], // Handle .tsx files as well
    '^.+\\.js$': 'babel-jest', // Optionally use babel-jest for .js files
  },

  // Specify the location of the setup file for global setup/teardown
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Path to your global setup file

  // Optional: Set up coverage collection
  collectCoverage: true, // Enable coverage reports
  collectCoverageFrom: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'], // Collect coverage from TypeScript and test files

  // Optional: Additional Jest settings (custom test match, etc.)
  testMatch: ['**/*.test.ts', '**/*.test.tsx'], // Match test files with .test.ts or .test.tsx extensions
};

export default config;
