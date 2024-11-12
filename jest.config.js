module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transforms TS and JS files using babel-jest
  },
  testEnvironment: 'node', // Node environment for backend tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'], // Supports JSON module imports
  transformIgnorePatterns: ['/node_modules/'], // Ignore transformations in node_modules
  moduleNameMapper: {
    // Maps imports from src to dist for compiled paths
    '^@/(.*)$': '<rootDir>/dist/$1',
    '^src/(.*)$': '<rootDir>/dist/$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/dist'], // Specifies root directories for tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file for global configurations
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}', // Collect coverage only from source files
    '!src/**/*.d.ts',           // Exclude type declaration files
  ],
  coverageDirectory: '<rootDir>/coverage', // Specify coverage output directory
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Looks for test files with .spec or .test
};
