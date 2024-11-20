"use strict";
module.exports = {
    // Specify the test environment, which is usually 'node' for backend testing
    testEnvironment: 'node',
    // Transform TypeScript files using ts-jest (if you're using TypeScript)
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript files
    },
    // Glob pattern to locate the test files
    testMatch: [
        '**/src/**/*.test.ts', // Test files should be located under the `src` directory
        '**/src/**/*.spec.ts', // Optionally match `.spec.ts` files as well
    ],
    // Setup global mocks for modules
    setupFiles: [
        // This can include any setup files you need, such as to mock global variables or API calls
        '<rootDir>/jest.setup.js', // If you have a `jest.setup.js` file for additional global setup
    ],
    // Automatically clear mock calls and reset mocks before each test
    resetMocks: true,
    // Enable verbose test output for easier debugging
    verbose: true,
    // Handle module imports that may not have a proper transformation (e.g., static assets)
    moduleNameMapper: {
        // Mocking static assets (like CSS files or images) for Jest tests
        '\\.(css|less|scss|svg)$': 'identity-obj-proxy', // Handles imports of CSS/SCSS/etc.
    },
    // Enable handling of files with no transformations (like .js, .ts, .json)
    moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    // Collect coverage from your source files
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,js}', // Collect coverage for TypeScript and JavaScript files in the `src` directory
        '!src/**/*.d.ts', // Exclude declaration files from coverage
    ],
    // If you're using Babel, you may also need to configure the Babel transformer
    transformIgnorePatterns: [
        '/node_modules/(?!your-module-to-transform).+\\.js$', // If any dependencies need to be transpiled
    ],
    // Configure custom test timeout if necessary
    testTimeout: 10000, // Adjust based on the complexity of your tests, especially async ones
};
//# sourceMappingURL=index.js.map