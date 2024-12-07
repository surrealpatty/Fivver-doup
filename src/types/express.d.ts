// src/types/express.d.ts
import { UserPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
