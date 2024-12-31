// jest.config.js

module.exports = {
  // Enable TypeScript support in Jest
  moduleFileExtensions: ['js', 'ts', 'tsx'],  // Ensure Jest recognizes .ts and .tsx extensions

  // Use babel-jest to transform TypeScript and JavaScript files
  transform: {
    '^.+\\.tsx?$': 'babel-jest',  // Use babel-jest to handle TypeScript files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest to handle JavaScript files
  },

  // Handle ES Modules (ESM) imports
  transformIgnorePatterns: [
    "/node_modules/(?!some-es-module)/", // Add the necessary packages if using ES modules
  ],

  // Set the test environment to Node.js
  testEnvironment: 'node',  // Set the test environment to Node.js

  // Global teardown script
  globalTeardown: './src/globalTeardown.ts',  // Reference the globalTeardown file

  // Use ts-jest preset for TypeScript and Babel integration
  preset: 'ts-jest/presets/js-with-babel',  // Use this preset to support TypeScript + Babel

  // Additional Jest config options can go here
};
