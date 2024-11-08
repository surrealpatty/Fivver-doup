module.exports = {
    // This will map any import from 'src/' to 'dist/src/' when running tests
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/dist/src/$1',
    },
    // Additional Jest configuration options can go here
  };
  