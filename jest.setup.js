import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Define Vue globally if not already defined
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({}); // Create an empty Vue instance
}

// Set up global mocks and configurations
config.global.mocks = {
  $t: (msg) => msg, // Example translation mock
};

// Optional: Mock sessionStorage if required
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
});

afterEach(() => {
  jest.clearAllMocks(); // Clear all mocks after each test
});
