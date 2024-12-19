// src/types/index.ts
import { Request } from 'express';

export interface CustomAuthRequest {
  user: {
    id: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
