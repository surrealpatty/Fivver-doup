// src/types/express.d.ts
import { UserPayload } from '@types';  // Correctly import UserPayload from the appropriate alias

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure the user property matches the UserPayload type from your types
    }
  }
}

export {};  // Ensures that the file is treated as a module
