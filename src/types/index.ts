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

// Define the CustomAuthRequest interface extending Express Request
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // This adds the 'user' field to the Request type
}

// Export other types if needed
export interface AuthRequest extends Request {
  user: UserPayload;  // The 'user' field is guaranteed to exist here
}
