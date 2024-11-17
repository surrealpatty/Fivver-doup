// src/types/authMiddleware.d.ts
import { Request } from 'express';

// Augmenting the Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;  // Optional userId on the request object
    }
  }
}

// This will ensure the file is treated as a module.
export {};
