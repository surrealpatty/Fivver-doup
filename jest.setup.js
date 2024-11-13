import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Check if Vue is already defined globally
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});
}

// Optionally, mock sessionStorage if needed
beforeEach(() => {
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Add any other necessary global mocks or settings
  config.global.mocks = {
    $t: (msg) => msg, // Example mock for translation function
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear all mocks after each test
});
