import { config } from '@vue/test-utils';
import { createApp } from 'vue';

beforeAll(() => {
  const app = createApp({});
  app.mount(document.createElement('div')); // Mount a dummy Vue app to avoid errors
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

  config.global.mocks = {
    $t: (msg) => msg, // Mock translation function or other global properties if needed
  };
});

afterEach(() => {
  jest.clearAllMocks();
});
