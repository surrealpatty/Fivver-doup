module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforms TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript files with Babel
    '.*\\.(vue)$': '@vue/vue3-jest', // Transforms Vue files for Jest
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue', 'node'], // Supported file extensions
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps imports starting with '@/' to the src directory
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
  },
  roots: ['<rootDir>/src'], // The root directory for Jest to look for test files
  testEnvironment: 'jsdom', // Uses jsdom to simulate the browser environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file to run before tests
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}'], // Collects coverage from all relevant files
  transformIgnorePatterns: ['/node_modules/'], // Exclude node_modules from transformation
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Path to tsconfig for ts-jest
    },
    'babel-jest': {
      isolatedModules: true, // Enable isolated modules for Babel
    },
  },
  testTimeout: 30000, // Default timeout for tests (in milliseconds)
  maxWorkers: 2, // Limits the number of workers Jest uses (helps with resource management)
  coverageThreshold: {
    global: {
      branches: 80, // Require 80% branch coverage
      functions: 80, // Require 80% function coverage
      lines: 80, // Require 80% line coverage
      statements: 80, // Require 80% statement coverage
    },
  },
  preset: 'ts-jest/presets/default', // Default ts-jest preset for TypeScript
};
