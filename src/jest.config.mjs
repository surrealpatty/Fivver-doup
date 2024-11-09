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
    // Map dist imports back to the correct src paths
    '^dist/(.*)$': '<rootDir>/src/$1',  // Maps dist imports to src during tests

    // If you are also using the src/ directly, make sure that works:
    '^src/(.*)$': '<rootDir>/src/$1',  // Ensure src paths work properly

    // Optionally, add more mappings if needed for other paths (like for absolute imports)
  },
};
