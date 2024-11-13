// jest.setup.js
import 'mock-local-storage';  // Import the mock-local-storage package

beforeAll(() => {
  // Ensure that sessionStorage is properly initialized
  global.sessionStorage = global.localStorage;  // Use mock-local-storage's localStorage as sessionStorage
});

afterAll(() => {
  // Clean up after tests
  jest.restoreAllMocks();
});
