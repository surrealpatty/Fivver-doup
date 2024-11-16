import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Default environment for browser-like behavior
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Ensure Jest can handle these file types
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files with ts-jest
    '^.+\\.(vue)$': 'vue3-jest', // Transform Vue files with vue3-jest
  },
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Specify where coverage files should go
  coverageReporters: ['text', 'lcov'], // Coverage format options
  testMatch: [
    '**/src/**/*.test.ts',  // Match all .test.ts files
    '**/src/**/*.spec.ts',  // Match all .spec.ts files
    '**/src/**/*.test.js',  // Match all .test.js files
    '**/src/**/*.spec.js',  // Match all .spec.js files
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist for coverage
  testTimeout: 30000, // Set a timeout of 30 seconds per test
  globals: {
    'ts-jest': {
      isolatedModules: true, // Speed up tests by isolating modules during compilation
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Resolve '@' alias to the src directory
  },
  setupFiles: ['<rootDir>/jest.setup.js'], // Optional setup file for mock data, environment configuration, etc.
  transformIgnorePatterns: [
    '/node_modules/',  // Ensure node_modules aren't transformed unless necessary
  ],
};

export default config;
