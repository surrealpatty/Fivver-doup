import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Handle TypeScript files with ts-jest
    '^.+\\.vue$': 'vue-jest',  // Handle Vue files with vue-jest
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],  // Ensure this file is being run as a setup
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // Other configuration options...
};

export default config;
