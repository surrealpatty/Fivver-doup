// src/types/express.d.ts
import { UserPayload } from './index';  // Import UserPayload from your types file

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure the user property is consistent with the UserPayload interface
    }
  }
}

export {};  // Ensures this file is treated as a module
