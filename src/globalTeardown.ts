// src/globalTeardown.ts

import { server } from './index';  // Import the server from index.ts

if (server && typeof server.close === 'function') {
  server.close(() => {
    console.log('Server closed successfully.');
  });
} else {
  console.log('Server is not running or has already been closed.');
}
