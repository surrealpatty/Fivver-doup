// src/types/index.ts

import { Request } from 'express';

// CustomAuthRequest interface for extending Express Request
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}

// Optional UserPayload interface for passing user data
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
