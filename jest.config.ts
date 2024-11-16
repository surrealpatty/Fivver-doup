import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Set the test environment to jsdom for browser-like features
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Include Vue file extensions
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }], // Use ts-jest for TypeScript files
    '^.+\\.vue$': 'vue-jest', // Use vue-jest to handle .vue files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Specify setup file to configure mocks and globals
  globals: {
    'vue-jest': {
      tsConfig: 'tsconfig.json', // Specify the tsconfig to use for vue-jest transformations
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias to map '@' to the src folder (optional, based on your project structure)
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vue|@vue|vue-router|vuex|@vue/test-utils)/)', // Ensure that Vue-related packages are transformed
  ],
  // Optional: You can add additional Jest options as needed
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Collect coverage from TypeScript files
    'src/**/*.{vue}', // Collect coverage from Vue files
  ],
  coverageReporters: ['text', 'lcov'], // Report coverage in text and lcov format
};

export default config;
