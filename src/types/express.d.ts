// src/types/express.d.ts

import { UserPayload } from '@types'; // Ensure this path is correct for your UserPayload interface

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add user property to the Request interface
    }
  }
}

export {};  // This ensures it's treated as a module
