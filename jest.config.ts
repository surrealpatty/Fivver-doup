import { server } from './src/index';  // Import the server instance

export default {
  // Jest configuration options
  globalTeardown: './src/globalTeardown.ts',  // Reference the globalTeardown file

  transform: {
    '^.+\\.tsx?$': 'babel-jest',  // Use babel-jest to transform TypeScript files
  },

  testEnvironment: 'node',  // Set the test environment to Node.js

  // Enable TypeScript support in Jest
  moduleFileExtensions: ['js', 'ts', 'tsx'],  // Ensure Jest recognizes .ts and .tsx extensions

  // Other Jest config options...
};
