// jest.config.mjs
export default {
    testEnvironment: 'node',
    testMatch: [
      "**/tests/**/*.[jt]s?(x)", // This will match any test files in the 'tests' directory
      "**/?(*.)+(spec|test).[tj]s?(x)" // This will match files ending with .test.js or .spec.js
    ],
  };
  