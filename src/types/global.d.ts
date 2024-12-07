// src/types/global.d.ts

import { UserPayload } from '@types';  // Correctly import UserPayload from the correct path

// Extend the Express namespace to include the custom `user` property in the Request object
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure user matches the UserPayload type
    }
  }
}

// Export an empty object to ensure the file is treated as a module
export {};
