module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Use jsdom for testing in the browser-like environment
  
  transform: {
    '^.+\\.tsx?$': 'ts-jest',        // Use ts-jest to handle TypeScript files (.ts and .tsx)
    '^.+\\.js$': 'babel-jest',       // Use babel-jest to handle JavaScript files (.js)
  },

  testMatch: [
    "**/src/test/**/*.test.{js,ts}",    // Match .test.js and .test.ts files in the src/test directory
    "**/src/tests/**/*.test.{js,ts}",   // Match .test.js and .test.ts files in the src/tests directory
    "**/src/test/**/*.spec.{js,ts}",    // Match .spec.js and .spec.ts files in the src/test directory
    "**/src/tests/**/*.spec.{js,ts}",   // Match .spec.js and .spec.ts files in the src/tests directory
  ],

  transformIgnorePatterns: [
    "/node_modules/(?!sequelize)/",     // Transform Sequelize files, which are in node_modules
  ],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',     // Map any import starting with 'src/' to the correct path
    '^dist/(.*)$': '<rootDir>/dist/$1',   // Map any import starting with 'dist/' to the dist directory
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],  // Path to the Jest setup file for global setup/teardown
  
  collectCoverageFrom: [
    "src/**/*.{js,ts}",                   // Collect coverage from all .js and .ts files in src/
    "!src/test/**",                       // Exclude files in the test directory from coverage
    "!src/tests/**",                      // Exclude files in the tests directory from coverage
  ],

  clearMocks: true,    // Automatically clear mocks between tests to ensure they don't carry over

  watchman: true,      // Enable Watchman for faster file change detection
  
  globals: {
    'ts-jest': {
      isolatedModules: true,  // For better performance when testing with TypeScript, this helps in projects that don't need type-checking during tests
    },
  },
};
