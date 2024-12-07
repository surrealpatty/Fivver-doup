// src/types/express.d.ts

import { UserPayload } from './index';  // Correctly import the UserPayload interface

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure 'user' property is consistent across all declarations
    }
  }
}

export {};  // Ensures this file is treated as a module
