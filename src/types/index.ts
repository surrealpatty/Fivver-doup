// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload type
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // `tier` is required
  role?: 'admin' | 'user';  // Optional role
}

// Extend Express' Request type to include the user property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional but will be populated by the authenticateToken middleware
}

// Optional: Add a type guard to ensure `req.user` is valid
export const isUser = (user: any): user is UserPayload => {
  return user && typeof user.id === 'string' && (user.tier === 'free' || user.tier === 'paid');
};
