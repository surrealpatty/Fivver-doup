// src/types/custom.d.ts

import { UserPayload } from './index';  // Ensure correct import of UserPayload

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Use the consistent UserPayload type
    }
  }
}
