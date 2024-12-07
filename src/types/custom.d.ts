// src/types/custom.d.ts
import { UserPayload } from './index';  // Import UserPayload

declare module 'express' {
  interface Request {
    user?: UserPayload;  // Ensure consistent declaration of the user property
  }
}
