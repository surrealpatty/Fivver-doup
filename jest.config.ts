import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'node',  // Test environment set to Node.js
  
  // Path alias resolution
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },

  transform: {
    '^.+\\.ts$': 'ts-jest',  // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest',  // Use babel-jest for JavaScript files (if needed)
  },

  roots: ['<rootDir>/src/test'],  // Folder containing the test files
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],  // If you have setup logic
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};

export default config;
