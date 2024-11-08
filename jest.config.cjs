module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/dist/src/$1',           // Maps src folder to dist/src
    '^models/(.*)$': '<rootDir>/dist/models/$1',     // Maps models folder to dist/models
    '^controllers/(.*)$': '<rootDir>/dist/src/controllers/$1', // Specifically map controllers
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
