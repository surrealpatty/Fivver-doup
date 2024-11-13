module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',       // Transforms TypeScript files with Babel
    '^.+\\.jsx?$': 'babel-jest',       // Transforms JavaScript files with Babel
    '^.+\\.vue$': 'vue-jest'           // Processes Vue files with vue-jest (if needed)
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],  // Supported extensions
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',    // Maps @ to src directory (for module resolution)
  },
  roots: ['<rootDir>/src'],            // Root directory for Jest to find tests
  testEnvironment: 'node',             // Set to 'node' environment for backend tests (use jsdom for frontend)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file for global configurations
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',       // Collect coverage from JS and TS files (no need for vue here)
  ],
  transformIgnorePatterns: [
    '/node_modules/',                  // Ignores transforming node_modules
  ],
  globals: {
    'babel-jest': {
      isolatedModules: true,            // Speeds up compilation for isolated modules in Babel
    },
  },
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'   // Looks for test files in your project with the .test or .spec pattern
  ],
  coverageDirectory: '<rootDir>/coverage', // Directory to save coverage reports
  coverageThreshold: {
    global: {
      branches: 80,  // Ensure at least 80% coverage for branches
      functions: 80,  // Ensure at least 80% coverage for functions
      lines: 80,      // Ensure at least 80% coverage for lines
      statements: 80  // Ensure at least 80% coverage for statements
    }
  },
};
