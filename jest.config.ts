import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
  testEnvironment: 'jsdom',  // Suitable for front-end testing, switch to 'node' if it's for back-end
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],  // Include 'vue' to support Vue components
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files using ts-jest
    '^.+\\.vue$': 'vue-jest',  // Transform Vue files using vue-jest
  },
  collectCoverage: true,  // Enable collection of coverage data
  coverageDirectory: 'coverage',  // Directory for coverage reports
  coverageReporters: ['text', 'lcov'],  // Coverage output formats
  testMatch: [
    '**/src/**/*.test.ts',
    '**/src/**/*.spec.ts',
    '**/src/**/*.test.js',
    '**/src/**/*.spec.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],  // Exclude these directories from coverage
  testTimeout: 30000,  // Set a timeout for tests (in milliseconds)
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Improve performance by isolating module compilation
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Correct path aliasing for TypeScript and Jest
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],  // Set up file for mocks and global variables
  transformIgnorePatterns: ['<rootDir>/node_modules/'],  // Skip transformations for node_modules
  // Optional: Uncomment if you're working with a Vue 3 setup:
  // moduleNameMapper: {
  //   '\\.(css|scss|sass)$': 'identity-obj-proxy',  // Handle stylesheets if needed
  // },
};

export default config;
