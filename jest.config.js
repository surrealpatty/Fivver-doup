module.exports = {
  testEnvironment: 'node',  // Ensure the correct environment is set
  testMatch: [
    "**/tests/**/*.test.js",  // Match test files with the .test.js extension
    "**/tests/**/*.spec.js",  // Match test files with the .spec.js extension
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest to transform .ts and .tsx files with TypeScript
    '^.+\\.js$': 'babel-jest',  // Use babel-jest to transform .js files with Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",  // Allow transforming sequelize (and any other necessary modules)
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Maps src imports to the src directory during tests
    '^dist/(.*)$': '<rootDir>/dist/$1',  // Maps dist imports to the dist directory during tests
  },
  setupFiles: ["<rootDir>/jest.setup.js"],  // Optionally include a setup file if needed
};
