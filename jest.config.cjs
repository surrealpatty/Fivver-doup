module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Use jsdom for simulating a browser-like environment in tests

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],  // Handle TypeScript files using ts-jest
    '^.+\\.js$': 'babel-jest',  // Use babel-jest for JavaScript files (CommonJS, ES modules)
  },

  testMatch: [
    "**/src/test/**/*.test.{js,ts}",    // Match .test.js and .test.ts files in src/test
    "**/src/tests/**/*.test.{js,ts}",   // Match .test.js and .test.ts files in src/tests
    "**/src/test/**/*.spec.{js,ts}",    // Match .spec.js and .spec.ts files in src/test
    "**/src/tests/**/*.spec.{js,ts}",   // Match .spec.js and .spec.ts files in src/tests
  ],

  transformIgnorePatterns: [
    "/node_modules/(?!sequelize|uuid)",  // Include sequelize and uuid for transformation
    // You can add other packages to this list if needed
  ],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Resolve imports starting with 'src/' to the 'src' directory
    '^dist/(.*)$': '<rootDir>/dist/$1',  // Resolve imports starting with 'dist/' to the 'dist' directory
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],  // Set up global configurations or mocks in jest.setup.js

  collectCoverageFrom: [
    "src/**/*.{js,ts}",  // Collect coverage from all .js and .ts files in the src folder
    "!src/test/**",  // Exclude test files from coverage
    "!src/tests/**", // Exclude test files from coverage
  ],

  clearMocks: true,  // Automatically clear mocks between tests

  watchman: true,  // Enable Watchman for fast file system watching (recommended for large projects)

  globals: {
    'ts-jest': {
      isolatedModules: true,  // Enable isolatedModules for faster TypeScript compilation in tests
    },
  },

  // Optional: Configure Babel to handle .ts files if necessary
  babelConfig: {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],  // Handle TypeScript with Babel
  },
};
