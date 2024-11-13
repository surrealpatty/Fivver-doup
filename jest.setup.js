import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// Initialize Vue globally (if necessary, this is usually handled by vue-jest)
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});
}

// Mock sessionStorage globally (if needed for your tests)
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

  // Mock global translation function
  config.global.mocks = {
    $t: (msg) => msg,  // Example mock for translation
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Reset all mocks after each test
});
