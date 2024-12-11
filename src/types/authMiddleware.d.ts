// src/types/authMiddleware.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Ensure the path to UserPayload is correct

export interface AuthRequest extends Request {
  user?: UserPayload;  // `user` is optional and can be `undefined`
}
