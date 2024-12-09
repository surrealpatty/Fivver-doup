import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'node',  // Running tests in a Node environment
  
  // Module alias mappings for path resolution
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Root-relative imports
    '^dist/(.*)$': '<rootDir>/dist/$1',  // Imports from dist
    '^@models/(.*)$': '<rootDir>/src/models/$1',  // For model imports
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // For controller imports
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',  // For route imports
    '^@config/(.*)$': '<rootDir>/src/config/$1',  // For config imports
    '^@types/(.*)$': '<rootDir>/src/types/$1',  // For type imports
    '^@src/(.*)$': '<rootDir>/src/$1',  // For src-related imports
  },

  // Ensure Jest finds modules in the 'src' directory
  moduleDirectories: ['node_modules', 'src'], 

  // Transform .ts files using ts-jest and .js files using babel-jest
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],  // Use ts-jest for .ts files
    '^.+\\.js$': 'babel-jest',  // Use babel-jest for .js files
  },

  // Setup script after environment is configured (if any)
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],  

  // Define the root folder for Jest to look for tests
  roots: ['<rootDir>/src/test'],  

  // Enable code coverage collection
  collectCoverage: true,  
  coverageDirectory: '<rootDir>/coverage',  // Directory to store coverage reports

  // Enable verbose output for test results
  verbose: true,  

  // File extensions to be recognized by Jest
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],  

  // Treat .ts files as ES modules
  extensionsToTreatAsEsm: ['.ts'],  

  // Match test files based on their extension
  testMatch: ['<rootDir>/src/**/*.test.ts'], 
};

export default config;
