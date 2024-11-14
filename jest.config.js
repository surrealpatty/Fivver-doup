module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'vue'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(vue)$': 'vue3-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    testMatch: [
      '**/src/**/*.test.ts',
      '**/src/**/*.spec.ts',
      '**/src/**/*.test.js',
      '**/src/**/*.spec.js',
    ],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
    testTimeout: 30000, // 30 seconds timeout for each test
  };
  