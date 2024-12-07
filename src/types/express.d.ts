// src/types/express.d.ts
import { UserPayload } from './index';  // Ensure path is correct

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Consistent declaration
    }
  }
}
