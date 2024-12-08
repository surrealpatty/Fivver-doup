// src/types/express.d.ts
import { UserPayload } from './index'; // Import the custom UserPayload type

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // Matches the custom UserPayload
        email?: string;
        username?: string;
        tier?: string;
      };
    }
  }
}
