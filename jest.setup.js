// Import Vue config for test-utils
import { config } from '@vue/test-utils';

// Ensure Vue is available globally in the testing environment
import Vue from 'vue';

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

  // Optional: Set up any global configurations for Vue if needed.
  // For example, you can configure Vue test utils globally:
  config.global.mocks = {
    $t: (msg) => msg, // Mocking a translation function, if needed
  };
});

afterEach(() => {
  // Clear mocks to avoid leakage between tests
  jest.clearAllMocks();
});
