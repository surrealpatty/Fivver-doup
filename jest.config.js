module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',  // Transforms TS and JS files using babel-jest
  },
  testEnvironment: 'node', // Node environment for backend tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],  // No need for 'vue' if not using Vue.js
  transformIgnorePatterns: ['/node_modules/'],  // Exclude node_modules from transformation
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/dist/$1',  // Maps source to dist if needed, adjust if necessary
  },
  roots: ['<rootDir>/src'],  // Test files root location
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Optional: Add setup file for global configurations
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],  // Collect coverage from all relevant files (no 'vue')
};
