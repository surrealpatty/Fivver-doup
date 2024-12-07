// src/types/express.d.ts
import { UserPayload } from './index'; // Ensure the correct path

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Make sure this is consistent
    }
  }
}
