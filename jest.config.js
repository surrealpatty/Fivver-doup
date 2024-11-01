module.exports = {
  // Set the test environment to jsdom, suitable for testing Vue components
  testEnvironment: 'jsdom',

  // Specify the transformers for Vue and JavaScript files
  transform: {
    '^.+\\.vue$': 'vue-jest', // Use vue-jest for .vue files
    '^.+\\.js$': 'babel-jest', // Use babel-jest for JavaScript files
  },

  // Define file extensions that Jest will look for
  moduleFileExtensions: ['js', 'vue', 'json'],

  // Define patterns for test file matching
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Match test files in __tests__ directory
    "**/?(*.)+(spec|test).[tj]s?(x)" // Match any .spec.js or .test.js files
  ],

  // Enable coverage collection
  collectCoverage: true,

  // Set the directory for coverage reports
  coverageDirectory: "coverage",

  // Optionally, you can exclude coverage for certain files or patterns
  coveragePathIgnorePatterns: [
    "/node_modules/", // Ignore node_modules directory
    "<rootDir>/src/main.js", // Ignore the main entry point if necessary
  ],
};
