module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'], // Ensure Jest can handle these file types
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',     // Transform TypeScript files with ts-jest
    '^.+\\.(vue)$': 'vue3-jest',      // Transform Vue files with vue3-jest
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testMatch: [
    '**/src/**/*.test.ts',            // Match all test files with .test.ts extension
    '**/src/**/*.spec.ts',
    '**/src/**/*.test.js',
    '**/src/**/*.spec.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these folders from coverage
  testTimeout: 30000,                 // 30 seconds timeout for each test
  globals: {
    'ts-jest': {
      isolatedModules: true,           // Enable isolated module compilation for faster tests
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',   // Resolve '@' to src for cleaner imports
  },
  setupFiles: ['<rootDir>/jest.setup.js'],  // Optional: Setup file for mocks or configurations
};
