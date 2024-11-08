module.exports = {
  moduleNameMapper: {
    '^../src/(.*)$': '<rootDir>/dist/src/$1',  // Adjust relative imports to point to dist/src
    '^src/(.*)$': '<rootDir>/dist/src/$1',     // Absolute imports from src/
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
  ],
};
