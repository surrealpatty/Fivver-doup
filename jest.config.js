module.exports = {
  preset: 'ts-jest',                             // Use ts-jest preset for TypeScript support
  testEnvironment: 'jsdom',                      // Use jsdom for testing in the browser environment
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Extensions Jest should look for
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',               // Use ts-jest to process TypeScript files
    '^.+\\.(vue)$': 'vue3-jest',                // Use vue3-jest for Vue 3 files
  },
  collectCoverage: true,                        // Enable code coverage collection
  coverageDirectory: 'coverage',                // Store coverage reports in the 'coverage' directory
  coverageReporters: ['text', 'lcov'],          // Output text and lcov coverage reports
  testMatch: [
    '**/src/**/*.test.ts',                      // Match all .test.ts files in the src folder
    '**/src/**/*.spec.ts',                      // Match all .spec.ts files in the src folder
    '**/src/**/*.test.js',                      // Match all .test.js files in the src folder
    '**/src/**/*.spec.js',                      // Match all .spec.js files in the src folder
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Exclude these paths from coverage
  testTimeout: 30000,                           // 30 seconds timeout for each test
  globals: {
    'ts-jest': {
      isolatedModules: true,                    // Enable isolated modules for faster compilation
    },
  },
  moduleNameMapper: {
    // Ensure that imports of Vue components are correctly handled during testing
    '^@/(.*)$': '<rootDir>/src/$1',             // Resolve @ to src folder (useful for cleaner imports in tests)
  },
  setupFiles: ['<rootDir>/jest.setup.js'],      // Optional: Add any setup files (e.g., mocking libraries)
};
