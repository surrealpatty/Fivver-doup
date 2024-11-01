module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'vue'],
  };

  