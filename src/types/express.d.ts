// src/types/express.d.ts
import { UserPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserPayload>;  // Make properties optional for user
    }
  }
}
