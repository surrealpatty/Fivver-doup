// src/types/express.d.ts
import { UserPayload } from './index';  // Make sure the path is correct

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Declare 'user' consistently here
    }
  }
}
