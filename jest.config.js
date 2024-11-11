module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Use jsdom for browser-like environment in tests
  
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],  // Inline ts-jest config to avoid globals usage
    '^.+\\.js$': 'babel-jest',       // Use babel-jest to handle JavaScript files (.js)
  },

  testMatch: [
    "**/src/test/**/*.test.{js,ts}",    // Match .test.js and .test.ts files in src/test
    "**/src/tests/**/*.test.{js,ts}",   // Match .test.js and .test.ts files in src/tests
    "**/src/test/**/*.spec.{js,ts}",    // Match .spec.js and .spec.ts files in src/test
    "**/src/tests/**/*.spec.{js,ts}",   // Match .spec.js and .spec.ts files in src/tests
  ],

  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)",     // Transform Sequelize in node_modules
  ],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',     // Map imports starting with 'src/' to src directory
    '^dist/(.*)$': '<rootDir>/dist/$1',   // Map imports starting with 'dist/' to dist directory
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],  // Jest setup for global setup/teardown
  
  collectCoverageFrom: [
    "src/**/*.{js,ts}",                   // Collect coverage from all .js and .ts files in src/
    "!src/test/**",                       // Exclude files in test directory from coverage
    "!src/tests/**",                      // Exclude files in tests directory from coverage
  ],

  clearMocks: true,    // Automatically clear mocks between tests
  
  watchman: true,      // Enable Watchman for faster file change detection
};
