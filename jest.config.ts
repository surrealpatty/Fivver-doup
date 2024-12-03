// jest.config.js

module.exports = {
  preset: 'ts-jest', // Use ts-jest for handling TypeScript files
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',                 // Map `@/` to `src/`
    '^dist/(.*)$': '<rootDir>/dist/$1',             // Map `dist/` to `dist/`
    '^@models/(.*)$': '<rootDir>/src/models/$1',    // Map `@models/` to `src/models/`
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // Map `@controllers/` to `src/controllers/`
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',    // Map `@routes/` to `src/routes/`
    '^@config/(.*)$': '<rootDir>/src/config/$1',    // Map `@config/` to `src/config/`
    '^@types/(.*)$': '<rootDir>/src/types/$1',      // Map `@types/` to `src/types/`
  },
  moduleDirectories: ['node_modules', 'dist', 'src'],  // Resolve modules from node_modules, dist, and src
  transform: {
    '^.+\\.ts$': 'ts-jest',                         // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest',                       // Use babel-jest for JavaScript files
  },
  extensionsToTreatAsEsm: ['.ts'],                    // Treat TypeScript files as ESM (if needed)
  testEnvironment: 'node',  // Use Node.js environment for testing
  roots: ['<rootDir>/src/test'],                      // Point to the test folder
  collectCoverage: true,                              // Enable code coverage collection
  coverageDirectory: '<rootDir>/coverage',           // Output code coverage directory
  verbose: true,                                      // Enable verbose output for tests
  moduleFileExtensions: ['ts', 'tsx', 'js'],          // Include .ts, .tsx, and .js extensions
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],  // Set up environment before running tests
  setupFiles: ['<rootDir>/src/test/setup.ts'],        // Load setup.ts before tests run (to load environment)
};
