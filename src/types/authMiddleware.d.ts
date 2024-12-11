// src/types/authMiddleware.ts
import { Request } from 'express';
import { UserPayload } from './index';

export interface AuthRequest extends Request {
  user: UserPayload | undefined;  // Allow user to be undefined temporarily
}
