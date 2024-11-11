module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Use jsdom for browser-like environment in tests
  
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],  // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest',       // Use babel-jest to handle JavaScript files
  },

  testMatch: [
    "**/src/test/**/*.test.{js,ts}",    // Match .test.js and .test.ts files in src/test
    "**/src/tests/**/*.test.{js,ts}",   // Match .test.js and .test.ts files in src/tests
    "**/src/test/**/*.spec.{js,ts}",    // Match .spec.js and .spec.ts files in src/test
    "**/src/tests/**/*.spec.{js,ts}",   // Match .spec.js and .spec.ts files in src/tests
  ],

  transformIgnorePatterns: [
    "/node_modules/(?!sequelize|uuid)",     // Transform Sequelize and uuid in node_modules
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

  // Optional: Add a custom `globals` config if using ts-jest with isolatedModules
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
