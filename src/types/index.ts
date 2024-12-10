// src/types/index.ts

import { Request } from 'express';  // Importing the base Request type from express

// UserPayload interface
export interface UserPayload {
  id: string;             // User ID, should be a string (required)
  username: string;       // Username is required (no longer optional)
  email: string;          // Email is now required (no longer optional)
  tier: 'free' | 'paid';  // Tier can only be 'free' or 'paid'
  [key: string]: any;     // Optional: Allow additional properties for future expansion
}

// AuthRequest interface extending Express' Request to include the 'user' property
export interface AuthRequest extends Request {
  user?: UserPayload;  // `user` is optional and can conform to `UserPayload`
}
