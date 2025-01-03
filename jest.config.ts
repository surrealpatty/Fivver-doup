import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',           // Transform TypeScript files with ts-jest
    '^.+\\.js$': 'babel-jest',         // Transform JavaScript files with babel-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from both TypeScript and JavaScript files
    '!src/**/*.d.ts',    // Exclude declaration files
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000,      // Increase timeout to 30 seconds for tests
  maxWorkers: '50%',       // Use fewer workers to reduce resource load
  transformIgnorePatterns: ['node_modules/(?!your-esm-package/)'],  // Ensure ESM packages are transformed
};

export default config;
