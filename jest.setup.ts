import { config } from '@vue/test-utils';  // Import Vue Test Utils
import { createApp } from 'vue';            // Vue app import

// Explicitly declare the global Vue type to avoid TypeScript errors
declare global {
  var Vue: ReturnType<typeof createApp>;
}

// Ensure Vue is available globally for all tests
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});  // Initialize a Vue app instance globally if Vue isn't already set
}

// Mock sessionStorage globally for tests
beforeEach(() => {
  // Mock sessionStorage using Object.defineProperty
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'),  // Return mocked value for getItem
      setItem: jest.fn(),  // Mock setItem
      removeItem: jest.fn(),  // Mock removeItem
      clear: jest.fn(),    // Mock clear
    },
    writable: true,
  });

  // Mock global translation function ($t) commonly used in Vue apps with i18n
  config.global.mocks = {
    $t: (msg: string) => msg,  // Return the message string itself (for simple translation mocking)
  };
});

// After each test, clear all mocks and reset mocks to avoid state leakage between tests
afterEach(() => {
  jest.clearAllMocks();  // Clear all mocks between tests to ensure no state leaks
});
