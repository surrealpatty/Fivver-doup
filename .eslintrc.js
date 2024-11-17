module.exports = {
    env: {
      jest: true, // Enable Jest globals
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended', // if using eslint-plugin-jest
    ],
  };
  