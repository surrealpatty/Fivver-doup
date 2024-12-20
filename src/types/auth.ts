// src/types/auth.ts
import { Request } from 'express';
import { UserPayload } from '../types'; // Correct the import to match the export


export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Make `user` optional
}
