export default {
  preset: 'ts-jest', // Use ts-jest for handling TypeScript files
  testEnvironment: 'node', // Use Node.js environment for testing

  // Module name mapping for easier imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',                 // Map `@/` to `src/`
    '^dist/(.*)$': '<rootDir>/dist/$1',             // Map `dist/` to `dist/`
    '^@models/(.*)$': '<rootDir>/src/models/$1',    // Map `@models/` to `src/models/`
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',  // Map `@controllers/` to `src/controllers/`
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',    // Map `@routes/` to `src/routes/`
    '^@config/(.*)$': '<rootDir>/src/config/$1',    // Map `@config/` to `src/config/`
    '^@types/(.*)$': '<rootDir>/src/types/$1',      // Map `@types/` to `src/types/`
    '^@src/(.*)$': '<rootDir>/src/$1',              // Map `@src/` to `src/`
  },

  // Module directories to resolve imports
  moduleDirectories: ['node_modules', 'src'], // Resolve modules from node_modules and src

  // Transform files using ts-jest for TypeScript and babel-jest for JavaScript
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }], // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },

  // Setup files to be loaded before running tests
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Load setup.ts after environment is set up

  // Test directories and options
  roots: ['<rootDir>/src/test'], // Point to the test folder
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: '<rootDir>/coverage', // Directory for code coverage output
  verbose: true, // Enable verbose output for tests

  // Supported file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Include .ts, .tsx, .js, and .json extensions

  // Treat TypeScript files as ESM (if needed)
  extensionsToTreatAsEsm: ['.ts'],
};
