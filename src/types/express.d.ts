// src/types/express.d.ts
import { UserPayload } from './index';  // Correct import path

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Use UserPayload as the type for user, which matches your definition
    }
  }
}
