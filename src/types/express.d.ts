// src/types/express.d.ts
import { UserPayload } from './index';  // Import UserPayload from the correct location

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Make sure it's correctly typed here
    }
  }
}
