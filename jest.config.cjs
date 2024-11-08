module.exports = {
  moduleNameMapper: {
    '^../(.*)$': '<rootDir>/dist/$1',       // Maps any import starting with '../' to the dist directory
    '^src/(.*)$': '<rootDir>/dist/src/$1',  // Maps absolute imports from 'src/' to 'dist/src/'
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
