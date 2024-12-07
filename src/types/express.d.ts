// src/types/express.d.ts
import { UserPayload } from './index';  // Import UserPayload from your custom types

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure user matches the correct type
    }
  }
}
