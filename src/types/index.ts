// src/types/index.ts

// UserPayload interface
export interface UserPayload {
  id: string;             // User ID, should be a string (required)
  username: string;       // Username is required (no longer optional)
  email: string;          // Email is now required (no longer optional)
  tier: 'free' | 'paid';  // Tier can only be 'free' or 'paid'
  [key: string]: any;     // Optional: Allow additional properties for future expansion
}

// AuthRequest interface extending Express' Request to include user property
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: UserPayload;  // `user` is optional and can conform to `UserPayload`
}
