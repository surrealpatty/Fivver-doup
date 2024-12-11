// src/types/authMiddleware.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Adjust the import path as needed

export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure user includes 'tier' and other properties like 'id', etc.
}
