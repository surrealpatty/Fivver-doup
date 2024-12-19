// src/types/index.ts

import { Request } from 'express';

// Define the user payload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure tier is either 'free' or 'paid'
  role?: 'admin' | 'user';  // Optional role
}

// Custom request type to include the user
export interface CustomAuthRequest extends Request {
  user: UserPayload;
}
