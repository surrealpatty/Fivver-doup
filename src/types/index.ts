// src/types/index.ts

import { Request } from 'express';

// Define the CustomAuthRequest interface
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email?: string;
    username?: string;
    tier: 'free' | 'paid';
    role?: 'user' | 'admin';
  };
}


// Optional UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
