module.exports = {
  moduleNameMapper: {
    '^../(.*)$': '<rootDir>/dist/$1', // Fix mapping for relative paths starting with '../'
    '^src/(.*)$': '<rootDir>/dist/src/$1',
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
