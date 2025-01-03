import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transform TypeScript files with ts-jest
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files with babel-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'd.ts'], // Include .ts and .js in moduleFileExtensions
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from both TypeScript and JavaScript files
    '!src/**/*.d.ts',    // Exclude declaration files from coverage collection
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000,      // Increase timeout to 30 seconds for tests
  maxWorkers: '50%',       // Use fewer workers to reduce resource load
  transformIgnorePatterns: ['node_modules/(?!your-esm-package/)'],  // Ensure ESM packages are transformed
  moduleDirectories: ['node_modules', 'dist/src'], // Ensure Jest can resolve files from the dist directory
  moduleNameMapper: {
    // Add mappings to handle imports correctly
    '^src/(.*)$': '<rootDir>/src/$1',  // Map `src/` to the correct directory in your project
  },
};

export default config;
