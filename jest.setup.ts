import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom',  // Set the test environment to jsdom for browser-like features
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],  // Include Vue file extensions
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],  // Use ts-jest for TypeScript files
    '^.+\\.vue$': 'vue3-jest',  // Use vue3-jest for Vue 3 files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Specify setup file to configure mocks and globals
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Alias to map '@' to the src folder (optional, based on your project structure)
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vue|@vue|vue-router|vuex|@vue/test-utils)/)',  // Ensure that Vue-related packages are transformed
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,vue}',  // Collect coverage from TypeScript and Vue files
    '!src/**/*.d.ts',  // Exclude declaration files from coverage
  ],
  coverageDirectory: 'coverage',  // Specify the directory where coverage reports will be stored
  coverageProvider: 'v8',  // Use v8 for faster code coverage collection
  testPathIgnorePatterns: [
    '/node_modules/',  // Ignore node_modules during tests
  ],
  verbose: true,  // Enable verbose output to see detailed test results
};

export default config;
