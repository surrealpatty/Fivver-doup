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
      tsconfig: 'tsconfig.json', // Ensure correct TypeScript config for Jest
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

  // If necessary, set up other options like setupFiles, collectCoverage, etc.
  setupFiles: ['<rootDir>/jest.setup.ts'], // Optional, for setup before tests
};

export default config;
