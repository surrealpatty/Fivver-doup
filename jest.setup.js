import { config } from '@vue/test-utils';  // Import from Vue Test Utils
import { createApp } from 'vue';  // Vue app import

// Initialize Vue globally (if necessary, this is usually handled by vue-jest)
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});  // Initialize a Vue app instance globally
}

// Mock sessionStorage globally for tests
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

  // Mock global translation function ($t)
  config.global.mocks = {
    $t: (msg: string) => msg,  // Mock translation function: returns the message itself for now
  };
});

// After each test, clear all mocks
afterEach(() => {
  jest.clearAllMocks();  // Reset all mocks after each test
});
