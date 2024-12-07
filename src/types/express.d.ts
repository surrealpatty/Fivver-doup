// src/types/express.d.ts
import { UserPayload } from './index';  // Import UserPayload from the correct file

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add 'user' property with the correct type
    }
  }
}
