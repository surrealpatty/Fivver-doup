import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Keep this for TypeScript support
  testEnvironment: 'jsdom',  // For front-end testing (use 'node' for back-end tests)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],  // Include 'vue' for Vue components
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files with ts-jest
    '^.+\\.vue$': 'vue-jest',  // Transform Vue files with vue-jest (for Vue 3)
  },
  collectCoverage: true,  // Enable code coverage collection
  coverageDirectory: 'coverage',  // Directory to store coverage reports
  coverageReporters: ['text', 'lcov'],  // Formats for coverage reports
  testMatch: [
    '**/src/**/*.test.ts',
    '**/src/**/*.spec.ts',
    '**/src/**/*.test.js',
    '**/src/**/*.spec.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],  // Exclude these directories from coverage
  testTimeout: 30000,  // Set a timeout limit (in milliseconds) for tests, particularly useful for async tests
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Ensures fast compilation for isolated modules
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Ensure path alias works for TypeScript
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],  // Path to environment setup file (e.g., mocks or global setups)
  transformIgnorePatterns: ['<rootDir>/node_modules/'],  // Skip transformation for node_modules
};

export default config;
