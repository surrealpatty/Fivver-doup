import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript
  testEnvironment: 'node', // Test environment for Node.js
  maxWorkers: 1, // Run tests in a single worker to help identify leaks
  detectLeaks: true, // Detect unhandled asynchronous operations
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files (for ES module support)
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1', // Map @models to src/models
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1', // Map @controllers to src/controllers
    '^@services/(.*)$': '<rootDir>/src/services/$1', // Map @services to src/services
    '^@utils/(.*)$': '<rootDir>/src/utils/$1', // Map @utils to src/utils (if needed)
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Point to the TypeScript config for Jest
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'], // Recognize JS, TS, and TSX files
  transformIgnorePatterns: [
    '/node_modules/(?!(@babel|some-other-package-to-transform)/)', // Example: transform certain node_modules
  ],
  setupFiles: ['<rootDir>/jest.setup.ts'], // Optional: setup file for custom mocks or global setups
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Remove .js as it is inferred as ESM
  resolver: '<rootDir>/node_modules/jest-resolve', // Use Jest resolver to handle ESM
};

export default config;
