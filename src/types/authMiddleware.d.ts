// src/types/authMiddleware.ts
import { Request } from 'express';
import { UserPayload } from './index';  // Ensure the correct import for UserPayload

export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure `user` is of type `UserPayload`
}
