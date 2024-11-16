import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Set the test environment to jsdom for browser-like features
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Include Vue file extensions
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }], // Use ts-jest for TypeScript files
    '^.+\\.vue$': 'vue3-jest', // Use vue3-jest for Vue 3 files
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
};

export default config;
