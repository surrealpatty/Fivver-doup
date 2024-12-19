// src/types/index.ts
import { Request } from 'express'; // Importing express types

// Define the user payload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Ensure tier is either 'free' or 'paid'
  role?: 'admin' | 'user';  // Optional role
}

export interface CustomAuthRequest extends Request {
  user: { id: string; email: string; username: string };
}