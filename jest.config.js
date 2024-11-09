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
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Maps src imports to the src directory during tests
    '^dist/(.*)$': '<rootDir>/src/$1',  // Map dist imports back to src during tests
  },
};
