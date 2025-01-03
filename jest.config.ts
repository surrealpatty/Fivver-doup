import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other Jest configurations
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // Include 'ts' and 'tsx'

  // Use ts-jest for TypeScript files
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for .ts files
    '^.+\\.tsx$': 'ts-jest', // Use ts-jest for .tsx files
    '^.+\\.js$': 'babel-jest', // Optionally use babel-jest for .js files
  },

  // Specify the preset for TypeScript
  preset: 'ts-jest',

  // If necessary, add other configurations such as testEnvironment, etc.
  testEnvironment: 'node', // or 'jsdom' if you're testing client-side code
};

export default config;
