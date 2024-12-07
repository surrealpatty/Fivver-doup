// src/types/express.d.ts

import { UserPayload } from './index';  // Correctly import the UserPayload interface

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add 'user' property to the Request interface
    }
  }
}

export {};  // Ensures this file is treated as a module
