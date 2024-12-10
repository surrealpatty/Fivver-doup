// src/types/authMiddleware.ts
import { Request } from 'express';
import { UserPayload } from './index';  // Import UserPayload interface

export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure `user` is typed as UserPayload, which includes the `tier` property
}
