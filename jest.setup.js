import { config } from '@vue/test-utils';
import { createApp } from 'vue';

beforeAll(() => {
  // Create and mount a dummy Vue instance to ensure Vue is globally available
  const app = createApp({});
  app.mount(document.createElement('div')); // Mount to an element to avoid errors
});

// Mock sessionStorage to simulate browser's sessionStorage in tests
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

  // Optional: Mock any other global properties you need for your tests
  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function if you're using internationalization
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test to prevent leakage
});
