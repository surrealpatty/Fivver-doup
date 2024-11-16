import { config } from '@vue/test-utils';  // Import Vue Test Utils
import { createApp } from 'vue';  // Vue app import

// Explicitly define the global Vue type to avoid TypeScript errors
declare global {
  var Vue: ReturnType<typeof createApp>;
}

// Initialize Vue globally (if necessary, this is usually handled by vue-jest)
if (typeof globalThis.Vue === 'undefined') {
  globalThis.Vue = createApp({});  // Initialize a Vue app instance globally if Vue isn't already set
}

// Mock sessionStorage globally for tests
beforeEach(() => {
  // Mock sessionStorage using Object.defineProperty
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      getItem: jest.fn().mockReturnValue('mockedItem'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Mock global translation function ($t) commonly used in Vue apps with i18n
  config.global.mocks = {
    $t: (msg: string) => msg,  // Returns the message string itself (for simple translation mocking)
  };
});

// After each test, clear all mocks and reset mocks to avoid state leakage between tests
afterEach(() => {
  jest.clearAllMocks();  // Clear all mocks between tests to ensure no state leaks
});
