module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',       // Transforms TypeScript files with Babel
    '^.+\\.jsx?$': 'babel-jest',       // Transforms JavaScript files with Babel
    '^.+\\.vue$': 'vue-jest',           // Processes Vue files with vue-jest (if needed)
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],  // Supported extensions
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',    // Maps @ to src directory (for module resolution)
  },
  roots: ['<rootDir>/dist', '<rootDir>/src'],            // Root directory for Jest to find tests
  testEnvironment: 'node',             // Change to node environment for backend tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file for global configurations
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',    // Collect coverage from these file types
  ],
  transformIgnorePatterns: [
    '/node_modules/',                  // Ignores transforming node_modules
  ],
  globals: {
    'babel-jest': {
      isolatedModules: true,            // Speed up compilation for isolated modules in Babel
    },
  },
  // Preset to work with TypeScript
  preset: 'ts-jest/presets/js-with-ts', // Using ts-jest for TypeScript handling, along with Babel for transformation
  testMatch: ['**/?(*.)+(spec|test).ts?(x)', '**/?(*.)+(spec|test).js'], // Look for test files
};
