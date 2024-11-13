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
  testEnvironment: 'node',             // Change to node environment for backend tests (jsdom is for frontend)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file for global configurations
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',    // Collect coverage from these file types
  ],
  transformIgnorePatterns: [
    '/node_modules/',                  // Ignores transforming node_modules
  ],
  // Optional: Configure Babel for transpiling TypeScript if it's not already in your Babel config
  globals: {
    'ts-jest': {
      isolatedModules: true,            // Speed up compilation for isolated modules
    },
  },
};
