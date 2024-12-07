// src/types/express.d.ts
import { UserPayload } from './index';  // Correct path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Make sure this matches your custom `UserPayload` interface
    }
  }
}
