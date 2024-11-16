import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',  // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom',  // Use jsdom for simulating a browser-like environment
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],  // File extensions Jest should recognize
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files with ts-jest
    '^.+\\.vue$': 'vue-jest',  // Transform Vue files with vue-jest
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Ensure setup file is run before tests
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Improve performance by isolating modules (skip type checking)
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Optional: Map aliases like `@/` to `src/` for cleaner imports
  },
  transformIgnorePatterns: [
    '/node_modules/(?!vue|@vue|vue-jest)',  // Allow transformation of certain node_modules packages (like Vue)
  ],
  testPathIgnorePatterns: [
    '/node_modules/',  // Ignore test files in node_modules
  ],
  // Optional: Set test coverage thresholds, add test match patterns, etc.
  collectCoverageFrom: ['src/**/*.{ts,tsx,vue}', '!src/**/*.d.ts'],
};

export default config;
