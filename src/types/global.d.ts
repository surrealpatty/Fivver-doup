// src/types/global.d.ts

import { UserPayload } from './index'; // Import the custom UserPayload type

// Extend the Express namespace to include the custom `user` property in the Request object
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Add the `user` property with the correct UserPayload type
    }
  }
}

// Export an empty object to ensure the file is treated as a module
export {};
