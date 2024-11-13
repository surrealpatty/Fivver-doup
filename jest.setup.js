// Import Vue Test Utils configuration
import { config } from '@vue/test-utils';
// Import Vue to make sure it's available globally
import { createApp } from 'vue';

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

  // Ensure Vue is properly set up for the tests
  // Create a global Vue instance for the test environment
  config.global.app = createApp({});

  // Optional: Set up any global configurations for Vue Test Utils
  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function or other global properties if needed
  };
});

afterEach(() => {
  // Clear mocks to avoid leakage between tests
  jest.clearAllMocks();
});
