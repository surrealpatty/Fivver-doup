module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/dist/src/$1',
    '^@src/(.*)$': '<rootDir>/dist/src/$1', // Alternative mapping for '@src/' imports
    '^../(.*)$': '<rootDir>/dist/$1', // Maps relative imports starting with '../' to the dist directory
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
