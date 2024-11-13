import { config } from '@vue/test-utils';
import { createApp } from 'vue';

// This will create a dummy Vue app before the tests
beforeAll(() => {
  const app = createApp({});
  app.mount(document.createElement('div')); // Mount to avoid errors related to Vue not being mounted
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

  // Mock translation function if you're using internationalization
  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});
