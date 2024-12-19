// src/types/index.ts
import { Request } from 'express';

// Define and export the `CustomAuthRequest` interface
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}

// Ensure `UserPayload` is exported too (if necessary)
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure 'tier' is part of the interface
  role?: 'user' | 'admin';
}
