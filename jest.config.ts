import { server } from './src/index';  // Import the server instance

export default {
  // Jest configuration options
  globalTeardown: './src/globalTeardown.ts',  // Reference the globalTeardown file

  transform: {
    '^.+\\.tsx?$': 'babel-jest',  // Use babel-jest for TypeScript files
  },

  testEnvironment: 'node',  // Set the test environment to Node.js

  // Other Jest config options...
};
