// src/types/express.d.ts

import { UserPayload } from './index'; // Import your UserPayload type

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Add user property to the Request interface
    }
  }
}
