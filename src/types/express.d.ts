// src/types/express.d.ts
import { UserPayload } from '@types';
import { Request, Response } from 'express';
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add user property to Request
    }
  }
}
