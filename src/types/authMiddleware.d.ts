// src/types/authMiddleware.d.ts
import { Request } from 'express';

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;  // Optional userId on the request object
    }
  }
}
