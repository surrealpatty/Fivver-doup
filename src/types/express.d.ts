// src/types/express.d.ts
import { UserPayload } from '@types';  // Import UserPayload from @types

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add user property with the UserPayload type
    }
  }
}
