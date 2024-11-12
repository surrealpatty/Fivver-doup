module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transforms TS and JS files using babel-jest
  },
  testEnvironment: 'node', // Node environment for backend tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'], // Added json for module imports
  transformIgnorePatterns: ['/node_modules/'], // Ignore transformations in node_modules
  moduleNameMapper: {
    // Maps imports to the correct dist paths in case of any src/dist path issues
    '^@/(.*)$': '<rootDir>/dist/$1',
  },
  roots: ['<rootDir>/src'], // Specifies the root for your test files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: Add setup file for global configurations
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'], // Specifies files for coverage collection
};
