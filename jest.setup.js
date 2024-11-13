import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Check if Vue is already defined globally, otherwise define it
if (typeof globalThis.Vue === 'undefined') {
  const app = createApp({});
  globalThis.Vue = app; // Assign Vue instance to global scope
}

// Additional global mocks or configuration
config.global.mocks = {
  $t: (msg) => msg, // Example mock for a translation function
};

beforeEach(() => {
  // Mock sessionStorage to avoid issues in the tests
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
  jest.clearAllMocks(); // Clear mocks after each test to avoid interference
});
