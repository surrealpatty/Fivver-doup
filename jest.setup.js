import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Ensure Vue is initialized globally before the tests run
beforeAll(() => {
  if (typeof globalThis.Vue === 'undefined') {
    globalThis.Vue = createApp({}); // Create and assign Vue app globally
  }
});

// Optional: If you need a global mock for `sessionStorage`
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

  // Mock Vue-related methods if needed (for translation, etc.)
  config.global.mocks = {
    $t: (msg) => msg, // Example of a mock for translation function (adjust based on your needs)
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test to prevent leakage
});
