module.exports = {
  preset: 'ts-jest/presets/js-with-babel', // Use ts-jest with Babel for better compatibility with ESM
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
    '/node_modules/(?!sequelize|uuid)', // Allow these modules to be transformed
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^dist/(.*)$': '<rootDir>/dist/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/test/**',
    '!src/tests/**',
  ],
  clearMocks: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
