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

// Define CustomAuthRequest that extends the Express Request type
// The 'user' field is optional
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user field
}

// Define AuthRequest where the 'user' field is required
export interface AuthRequest extends Request {
  user: UserPayload; // Required user field
}
