module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',      // Transforms JavaScript and TypeScript files
    '^.+\\.vue$': 'vue-jest'                     // Transforms Vue files using vue-jest
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],  // Include 'vue' for Vue component support
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',             // Map '@' to the src directory for cleaner imports
  },
  roots: ['<rootDir>/src'],                     // Define 'src' as the root directory for tests
  testEnvironment: 'jsdom',                     // Use 'jsdom' for a browser-like environment in Jest
  transformIgnorePatterns: ['/node_modules/'],  // Ignore transformations for node_modules
};
