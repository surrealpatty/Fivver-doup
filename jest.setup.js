// jest.setup.js

// For DOM-related assertions
require('@testing-library/jest-dom');  // Extends jest matchers for DOM elements (e.g., toBeInTheDocument, toHaveTextContent, etc.)

// Mocking global objects if needed
// Example: Mocking fetch if you're using it in your tests
// global.fetch = require('jest-fetch-mock');

// Example: Mocking sessionStorage or localStorage if you're using it in your app
// global.sessionStorage = require('mock-local-storage');

// Optionally, you can add global mocks here, e.g., for APIs, database connections, etc.

// Example of a global setup function for database (if you need one)
// jest.mock('path-to-your-database-connector', () => ({
//   connect: jest.fn(() => Promise.resolve('connected')),
//   disconnect: jest.fn(() => Promise.resolve('disconnected')),
// }));

// If you need custom global setup/teardown (e.g., for a test database):
// global.beforeAll(async () => {
//   await yourTestDBSetupFunction();
// });
// global.afterAll(async () => {
//   await yourTestDBTeardownFunction();
// });

