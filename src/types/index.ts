// src/types/index.ts
import { Request } from 'express';

// Define the `CustomAuthRequest` interface to extend the Request interface
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}

// Define the `UserPayload` interface (if needed)
export interface UserPayload {
  id: string;
  email?: string;  // Optional because email may be missing in some cases
  username?: string;
  tier: 'free' | 'paid';  // Required field for tier
  role?: 'user' | 'admin'; // Optional
}
