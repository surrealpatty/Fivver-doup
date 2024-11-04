export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/*.spec.js',
    '!src/main.js',
    '!src/**/index.js',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/main.js',
  ],
  // Uncomment the line below if you create a setupTests.js file in src
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  verbose: true,
  testTimeout: 30000,
};
