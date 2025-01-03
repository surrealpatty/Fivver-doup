import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Add this to transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from both TypeScript and JavaScript files
    '!src/**/*.d.ts',    // Exclude declaration files
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000,  // Increase timeout to 30 seconds
  maxWorkers: '50%',   // Use fewer workers to reduce resource load
};

export default config;
