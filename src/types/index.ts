// src/types/index.ts
import { Request } from 'express';

// CustomAuthRequest interface definition
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}

// Optionally export other interfaces if needed
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
