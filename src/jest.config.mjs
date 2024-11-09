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
    // Fix for resolving src and dist imports
    '^src/(.*)$': '<rootDir>/src/$1',  // Maps src imports to the src directory
    '^dist/(.*)$': '<rootDir>/src/$1',  // Maps dist imports back to src during tests

    // Other potential path fixes if needed (static assets or additional modules)
  },
  moduleDirectories: [
    "node_modules",  // Ensure node_modules are included in path resolution
    "<rootDir>/src",  // Include src for relative imports
  ],
};
