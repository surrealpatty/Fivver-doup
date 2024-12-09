// src/types/express.d.ts
import { UserPayload } from '@types';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add user property to Request
    }
  }
}
