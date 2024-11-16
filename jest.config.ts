import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Keep this once for TypeScript support
  testEnvironment: 'jsdom',  // If you are running tests for front-end components
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files
    // Removed vue3-jest transform, as it's no longer needed
  },
  collectCoverage: true,  // Collect code coverage
  coverageDirectory: 'coverage',  // Directory to save coverage reports
  coverageReporters: ['text', 'lcov'],  // Coverage report formats
  testMatch: [
    '**/src/**/*.test.ts',
    '**/src/**/*.spec.ts',
    '**/src/**/*.test.js',
    '**/src/**/*.spec.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],  // Ignore test coverage in these directories
  testTimeout: 30000,  // Test timeout (e.g., for async tests)
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Ensure isolated modules for speed
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Adjust paths for module resolution
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],  // Path to setup files (for environment setup)
  transformIgnorePatterns: ['/node_modules/'],  // Ignore node_modules from transformation
};

export default config;
