import { config } from '@vue/test-utils';
import * as Vue from 'vue';  // Import Vue directly

// Set Vue globally
globalThis.Vue = Vue;

// Mock sessionStorage and other globals as needed
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

  config.global.mocks = {
    $t: (msg) => msg,  // Translation function mock
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});
