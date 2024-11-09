module.exports = {
  testEnvironment: 'node',  // Use Node.js environment for testing
  testMatch: [
    "**/tests/**/*.test.js",  // Match test files with the .test.js extension
    "**/tests/**/*.spec.js",  // Match test files with the .spec.js extension
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to transform .js files with Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",  // Allow transforming sequelize (and any other necessary modules)
  ],
  extensionsToTreatAsEsm: ['.js'],  // Treat .js files as ESM
  moduleNameMapper: {
    // Resolve imports from src directory correctly
    '^src/(.*)$': '<rootDir>/src/$1',  // Maps src imports to the src directory
    '^dist/(.*)$': '<rootDir>/src/$1',  // Maps dist imports back to src during tests

    // Optional: If other files like images or CSS are causing issues, you can mock them here
  },
  moduleDirectories: [
    "node_modules",  // Ensure node_modules are included in path resolution
    "<rootDir>/src",  // Add src for relative imports
  ],
};
