// src/types/index.ts

import { Request } from 'express';

// CustomAuthRequest interface to extend Express Request
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    tier: 'free' | 'paid';  // Ensure the tier is either 'free' or 'paid'
    role?: 'admin' | 'user';  // Optional role, can be 'admin' or 'user'
  };
}

// Optional UserPayload interface for passing user data
export interface UserPayload {
  id: string;
  email?: string;  // Optional email field
  username?: string;  // Optional username field
  tier: 'free' | 'paid';  // Tier must be either 'free' or 'paid'
  role?: 'user' | 'admin';  // Optional role field, can be 'user' or 'admin'
}
