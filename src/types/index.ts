// src/types/index.ts
import { Request } from 'express';

// Define AuthRequest, extending the Request interface to include 'user'
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;  // Email and username are optional (undefined allowed)
    username?: string;
    tier: 'free' | 'paid'; // Tier is required
    role?: string; // Role is optional if it's not always present
  };
}

// Define UserPayload, representing the structure of the user in the token payload
export interface UserPayload {
  id: string;
  email?: string;  // Email is optional
  username?: string;  // Username is optional
  tier: 'free' | 'paid';
  role?: string; // Role is optional
}
