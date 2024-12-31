import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Enable TypeScript support in Jest
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'], // Ensure Jest recognizes .ts, .tsx, .json, and .node extensions

  // Use babel-jest to transform TypeScript and JavaScript files
  transform: {
    '^.+\\.tsx?$': 'babel-jest',  // Use babel-jest to handle TypeScript files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest to handle JavaScript files
  },

  // Handle ES Modules (ESM) imports
  transformIgnorePatterns: [
    "/node_modules/(?!some-es-module)/", // Add necessary packages if using ES modules
  ],

  // Set the test environment to Node.js
  testEnvironment: 'node',  // Set the test environment to Node.js

  // Global teardown script
  globalTeardown: './src/globalTeardown.ts',  // Reference the globalTeardown file (ensure this path is correct)

  // Use ts-jest preset for TypeScript and Babel integration
  preset: 'ts-jest/presets/js-with-babel',  // Use this preset to support TypeScript + Babel

  // Additional Jest config options can go here
  setupFiles: ['<rootDir>/src/setupTests.ts'], // Optional: Set up test configurations if needed

  // Automatically clear mock calls, instances, and results before every test
  clearMocks: true,

  // Collect coverage information
  collectCoverage: true,
  coverageDirectory: './coverage',  // Specify coverage output directory
  coverageProvider: 'v8',  // Use V8 for coverage collection

  // If using Babel decorators, ensure Babel configuration is set correctly in the jest config
  globals: {
    'ts-jest': {
      isolatedModules: true,  // Isolate modules for better performance
    },
  },
};

export default config;
