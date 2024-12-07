// src/types/express.d.ts
import { UserPayload } from './index';  // Ensure correct import

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure consistent declaration of `user`
    }
  }
}
