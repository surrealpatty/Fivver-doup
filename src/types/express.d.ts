// src/types/express.d.ts

import { JwtPayload } from './index';  // Assuming JwtPayload is defined elsewhere

// Augment the global Express namespace to include the `userId` property on Request
declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Ensure userId is typed as string to match the JWT payload
    }
  }
}

// Ensure this file is treated as a module by TypeScript
export {};
