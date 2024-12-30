// jest.setup.ts

// Example: Import reflect-metadata if you're using TypeORM or any other libraries that rely on decorators.
import 'reflect-metadata';

// You can include other global mocks or setups here if needed. For example:
// Mock global functions, timers, or other test-specific initializations.

beforeAll(() => {
  // Global setup code can go here, e.g., initializing a database connection or setting up mocks.
  console.log("Test environment initialized");
});

beforeEach(() => {
  // Run some code before each test, like resetting mocks or clearing caches.
});

afterEach(() => {
  // Clean up or reset any states after each test runs.
});

afterAll(() => {
  // Clean up global resources or close database connections after all tests have finished.
  console.log("Test environment cleaned up");
});
