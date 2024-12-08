import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'node',  // Running tests in a Node environment
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // For root-relative imports
    '^dist/(.*)$': '<rootDir>/dist/$1',  // For imports from dist
    '^@models/(.*)$': '<rootDir>/src/models/$1',  // For model imports
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // For controller imports
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',  // For route imports
    '^@config/(.*)$': '<rootDir>/src/config/$1',  // For config imports
    '^@types/(.*)$': '<rootDir>/src/types/$1',  // For type imports
    '^@src/(.*)$': '<rootDir>/src/$1',  // For src-related imports
  },
  moduleDirectories: ['node_modules', 'src'],  // Ensure Jest finds modules in 'src'
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],  // Use ts-jest to handle .ts files
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to handle .js files
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],  // Set up any necessary configurations after environment setup
  roots: ['<rootDir>/src/test'],  // Root folder for Jest to look for tests
  collectCoverage: true,  // Enable code coverage collection
  coverageDirectory: '<rootDir>/coverage',  // Directory to output coverage reports
  verbose: true,  // Display detailed test results
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],  // Recognize these file extensions
  extensionsToTreatAsEsm: ['.ts'],  // Treat .ts files as ESM
};

export default config;
