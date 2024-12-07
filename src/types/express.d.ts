// src/types/express.d.ts
import { UserPayload } from './index'; // Import the correct UserPayload type

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Define 'user' property here
    }
  }
}
