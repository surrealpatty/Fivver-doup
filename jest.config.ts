import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: 1,  // Run tests in a single worker to help identify leaks
  detectLeaks: true,  // Detect unhandled asynchronous operations
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',  // Map @models to src/models
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // Map @controllers to src/controllers
    '^@services/(.*)$': '<rootDir>/src/services/$1',  // Map @services to src/services
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',  // Map @utils to src/utils (if needed)
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Point to the TypeScript config for Jest
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],  // Recognize JS, TS, and TSX files
};

export default config;
