import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other Jest configurations
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'], // Include 'ts' and 'tsx'
  
  // Use babel-jest to transform .js files
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for .ts files
  },

  // You may need to specify a preset for TypeScript as well
  preset: 'ts-jest',
};

export default config;
