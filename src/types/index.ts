// src/types/index.ts

// UserPayload interface
export interface UserPayload {
  id: string;             // User ID, should be a string (required)
  username: string;       // Username is required (no longer optional)
  email?: string;         // Email is optional (can be a string or undefined)
  tier: 'free' | 'paid';  // Tier can only be 'free' or 'paid'
  [key: string]: any;     // Optional: Allow additional properties for future expansion
}

// AuthRequest interface extending Express' Request to include user property
import { Request } from 'express';

// Ensure that the `user` property can be `undefined` or a `UserPayload` with an optional email
export interface AuthRequest extends Request {
  user?: UserPayload;     // user is optional and conforms to UserPayload
}
