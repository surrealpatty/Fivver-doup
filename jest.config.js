module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',  // Transforms TS and JS files using babel-jest
  },
  testEnvironment: 'node', // Node environment for backend tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],  // Include necessary extensions (no need for 'vue' anymore)
  transformIgnorePatterns: ['/node_modules/'],  // Exclude node_modules from transformation
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Adjust the mapping to point to the 'src' folder
  },
  roots: ['<rootDir>/src'],  // Test files root location
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Optional: Add setup file for global configurations
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],  // Collect coverage from all relevant files
};
