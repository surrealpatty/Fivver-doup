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

// Define CustomAuthRequest that extends Express's Request type
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user field, will be populated by middleware
}

// Define AuthRequest where the 'user' field is required (for routes where authentication is guaranteed)
export interface AuthRequest extends Request {
  user: UserPayload; // Required user field
}
