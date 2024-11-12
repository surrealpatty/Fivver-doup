module.exports = {
  testEnvironment: 'jest-environment-jsdom',

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
    '^.+\\.js$': 'babel-jest',
  },

  testMatch: [
    '**/src/test/**/*.test.{js,ts}',
    '**/src/tests/**/*.test.{js,ts}',
    '**/src/test/**/*.spec.{js,ts}',
    '**/src/tests/**/*.spec.{js,ts}',
  ],

  transformIgnorePatterns: [
    '/node_modules/(?!sequelize|uuid)',  // Ensure specific modules are transformed
  ],

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',   // Maps 'src' to root directory for easy imports
    '^dist/(.*)$': '<rootDir>/dist/$1',  // Maps 'dist' to root directory for easy imports
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Path for setup files

  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/test/**',
    '!src/tests/**',
  ],

  clearMocks: true,  // Automatically clears mocks between tests

  watchman: true,  // Enables watch mode for faster test reruns

  globals: {
    'ts-jest': {
      isolatedModules: true,  // Ensures isolated modules in TypeScript tests
    },
  },

  // You may want to add more configurations depending on your use case
};
