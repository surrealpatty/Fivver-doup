import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Initialize Vue globally (if necessary, this is usually handled by vue-jest)
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});
}

// Mock sessionStorage globally
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
    $t: (msg) => msg,  // Mock translation function: returns the message itself for now
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Reset all mocks after each test
});
