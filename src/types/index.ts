// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: 'free' | 'paid';
  role?: 'admin' | 'user';
}

// Extend the Express Request interface to include the optional 'user' field
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // The 'user' field is optional and will be added in authenticateToken middleware
}

// Export other types if needed
export interface AuthRequest extends Request {
  user: UserPayload;  // The 'user' field is guaranteed to exist here
}
