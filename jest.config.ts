import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript
  testEnvironment: 'node', // Test environment for Node.js
  maxWorkers: 1, // Run tests in a single worker to help identify leaks
  detectLeaks: true, // Detect unhandled asynchronous operations
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
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
      isolatedModules: true, // Enable faster test compilation
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'], // Recognize JS, TS, and TSX files
  transformIgnorePatterns: [
    '/node_modules/', // Ignore node_modules for transformation
  ],
  setupFiles: ['<rootDir>/jest.setup.ts'], // Optional: setup file for custom mocks or global setups
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat .ts/.tsx as ESM
  testPathIgnorePatterns: ['/node_modules/'], // Ignore tests in node_modules folder
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.test.tsx'], // Match test files inside the src folder
};

export default config;
