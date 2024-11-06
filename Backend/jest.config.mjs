// jest.config.mjs
export default {
    testEnvironment: 'node',
    testMatch: [
      "**/tests/**/*.[jt]s?(x)", // Ensures files in the tests directory are picked up
      "**/?(*.)+(spec|test).[tj]s?(x)" // Ensures files ending with .test.js or .spec.js are picked up
    ],
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.js$", // Explicit regex pattern to match .test.js files
  };
  