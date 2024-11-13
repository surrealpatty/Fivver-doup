// Import Vue Test Utils configuration
import { config } from '@vue/test-utils';

// Mock sessionStorage to simulate browser's sessionStorage in tests
beforeAll(() => {
  // Define global sessionStorage mock
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'), // Mocks getItem
      setItem: jest.fn(), // Mocks setItem
      removeItem: jest.fn(), // Mocks removeItem
      clear: jest.fn(), // Mocks clear
    },
    writable: true, // Allows overwriting sessionStorage
  });

  // Optional: Set up any global configurations for Vue Test Utils
  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function or other global properties if needed
  };
});

afterEach(() => {
  // Clear mocks to avoid leakage between tests
  jest.clearAllMocks();
});
