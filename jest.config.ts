module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Ensure jest uses the tsconfig.json
    },
  },
  testEnvironment: 'node', // Running tests in a Node environment

  // Module alias mappings for path resolution
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias for root-relative imports
    '^dist/(.*)$': '<rootDir>/dist/$1', // Alias for transpiled files in dist
    '^@models/(.*)$': '<rootDir>/src/models/$1', // Alias for models directory
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1', // Alias for controllers
    '^@routes/(.*)$': '<rootDir>/src/routes/$1', // Alias for routes directory
    '^@config/(.*)$': '<rootDir>/src/config/$1', // Alias for configuration files
    '^@types/(.*)$': '<rootDir>/src/types/$1', // Alias for TypeScript types
    '^@shared/(.*)$': '<rootDir>/src/shared/$1', // Alias for shared resources
  },

  // Directories Jest will search for modules
  moduleDirectories: ['node_modules', 'src'], 

  // Transform settings for TypeScript and JavaScript
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json', // Ensure tsconfig.json is used for TypeScript files
      },
    ], // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },

  // Setup script after environment is configured
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Adjust if you have setup files

  // Define the root folder for Jest to look for tests
  roots: ['<rootDir>/src'], 

  // Enable code coverage collection
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage', // Directory to store coverage reports
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', // Collect coverage from TypeScript files
    '!<rootDir>/src/**/*.d.ts', // Exclude declaration files
    '!<rootDir>/src/**/index.ts', // Exclude index files
  ],

  // Enable verbose output for test results
  verbose: true,

  // File extensions to be recognized by Jest
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  // Treat .ts files as ES modules
  extensionsToTreatAsEsm: ['.ts'],

  // Match test files based on their extension
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
