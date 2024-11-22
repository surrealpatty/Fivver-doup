// src/types/express.d.ts

import { UserPayload } from './index'; // Import UserPayload from your types

// Augment the global Express namespace to include the `user` property on Request
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // `user` is optional and follows the UserPayload structure
    }
  }
}

// Ensure this file is treated as a module by TypeScript
export {};
