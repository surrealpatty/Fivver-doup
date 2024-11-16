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
    '^vue$': 'vue/dist/vue.runtime.esm-bundler.js',  // Map Vue to the correct build for Jest
  },
  transformIgnorePatterns: [
    '/node_modules/(?!vue|@vue|vue-jest|@testing-library)',  // Allow transformation of Vue and related packages
  ],
  testPathIgnorePatterns: [
    '/node_modules/',  // Ignore test files in node_modules
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,vue}',   // Collect coverage from TypeScript and Vue files
    '!src/**/*.d.ts',          // Exclude declaration files from coverage
    '!src/**/index.ts',        // Optionally exclude index.ts files from coverage (optional)
  ],
  // Optional: Coverage thresholds (set if needed)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
