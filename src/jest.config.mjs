module.exports = {
  testEnvironment: 'node',
  testMatch: [
    "**/tests/**/*.test.js", // Ensure you match test files with .test.js
    "**/tests/**/*.spec.js", // Ensure you match test files with .spec.js
  ],
  transform: {
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript transformations
  },
  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",  // Allow transforming sequelize
  ],
  extensionsToTreatAsEsm: ['.js'],  // Treat .js files as ES module
  moduleNameMapper: {
    // Map src imports to src directory
    '^src/(.*)$': '<rootDir>/src/$1',
    
    // Map dist imports back to src (e.g., dist/src/middleware/authMiddleware to src/middleware/authMiddleware)
    '^dist/(.*)$': '<rootDir>/src/$1',

    // Add other necessary mappings as required
  },
};
