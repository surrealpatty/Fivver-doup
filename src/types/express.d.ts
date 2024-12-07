// src/types/express.d.ts
import { UserPayload } from './index';  // Make sure to import the UserPayload type

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add user to the Request interface
    }
  }
}
