import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
  testEnvironment: 'node',  // Node.js environment
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transform TypeScript files with ts-jest
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files with babel-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'd.ts'],  // Support TypeScript and JavaScript
  coverageDirectory: 'coverage',  // Coverage directory
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from TypeScript and JavaScript files
    '!src/**/*.d.ts',    // Exclude declaration files from coverage
  ],
  testPathIgnorePatterns: ['/node_modules/'],  // Ignore node_modules
  testTimeout: 30000,  // Increase test timeout
  maxWorkers: '50%',   // Use fewer workers to optimize resources
  transformIgnorePatterns: ['node_modules/(?!your-esm-package/)'],  // Handle ESM packages
  moduleDirectories: ['node_modules', 'dist', 'src'],  // Ensure Jest resolves from these directories
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Map src to the correct directory
  },
  silent: true,         // Suppress unnecessary output
  verbose: false,       // Reduce verbosity
  noStackTrace: true,   // Suppress stack traces
  collectCoverage: true, // Enable coverage collection
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Speed up testing with isolated modules
    },
  },
  setupFiles: ['dotenv/config'],  // Load environment variables
  testMatch: ['**/src/test/**/*.ts'],  // Match test files
  setupFilesAfterEnv: ['./src/test/setup.ts'],  // Optional setup for Jest
};

export default config;
