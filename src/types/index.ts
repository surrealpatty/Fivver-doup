import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email?: string;  // Optional
    username?: string;  // Optional
    tier: 'free' | 'paid';  // Required
    role?: 'user' | 'admin';  // Optional
  };
}

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
