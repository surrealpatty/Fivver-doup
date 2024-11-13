import { config } from '@vue/test-utils';

// Only import Vue if it is not already defined
if (typeof Vue === 'undefined') {
  global.Vue = require('vue'); // Explicitly import Vue and assign it to the global object
}

beforeAll(() => {
  // Create a dummy Vue app to make Vue globally available
  const app = Vue.createApp({});
  app.mount(document.createElement('div'));
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

  // Optional: Mock translation function if you're using internationalization
  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function
  };
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});
