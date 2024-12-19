// src/types/auth.ts
import { Request } from 'express';
import { UserPayload } from './index';  // Import UserPayload from the correct location

export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Make `user` optional
}
