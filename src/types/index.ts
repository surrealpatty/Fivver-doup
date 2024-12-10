// src/types/index.ts
import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'paid';  // Add 'tier' field
  role: string;  // Add 'role' field if required
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // Assuming 'UserPayload' is already defined in the same file or imported
}
