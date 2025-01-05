module.exports = {
  preset: 'ts-jest',  // Use ts-jest preset for TypeScript support
  testEnvironment: 'node',  // Test environment is Node.js
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Transform TypeScript files with ts-jest
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files with babel-jest
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'd.ts', 'd.js'], // Include d.js for declaration files
  coverageDirectory: 'coverage',  // Directory to store coverage reports
  collectCoverageFrom: [
    'src/**/*.{ts,js}',  // Collect coverage from both TypeScript and JavaScript files
    '!src/**/*.d.ts',    // Exclude declaration files from coverage collection
  ],
  testPathIgnorePatterns: ['/node_modules/'],  // Ignore node_modules for testing
  testTimeout: 30000,  // Increase timeout to 30 seconds for tests
  maxWorkers: '50%',   // Use fewer workers to reduce resource load
  transformIgnorePatterns: ['node_modules/(?!your-esm-package/)'],  // Ensure ESM packages are transformed
  moduleDirectories: ['node_modules', 'dist', 'src'],  // Ensure Jest can resolve files from src and dist directories
  moduleNameMapper: {
    // Map src to the correct directory in your project
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  silent: true,         // Suppress unnecessary output
  verbose: false,       // Less detailed output
  noStackTrace: true,   // Suppress stack traces in output
  coverage: false,      // Disable coverage reporting
};
