import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Initialize Vue globally if not already defined
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});
}

// Set up Vue Test Utils global configuration
config.global.mocks = {
  $t: (msg) => msg,  // Example mock for a translation function
};

// Mock sessionStorage if used in tests
beforeEach(() => {
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'), // Mocked return value
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  // Clear all mocks and any side effects after each test
  jest.clearAllMocks();
});
