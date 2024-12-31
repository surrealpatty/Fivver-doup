// jest.config.ts

import { server } from './src/index';  // Import the server instance

module.exports = {
  // Jest configuration options
  globalTeardown: './src/globalTeardown.ts',  // Reference the globalTeardown file

  // Other Jest config options...
};
