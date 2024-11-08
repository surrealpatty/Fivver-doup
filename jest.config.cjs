module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/dist/src/$1',         // Maps src folder
    '^models/(.*)$': '<rootDir>/dist/models/$1',   // Maps models folder
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
