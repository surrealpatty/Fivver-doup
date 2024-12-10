// src/types/index.ts
import { Request } from 'express';

// Define UserPayload interface for the JWT payload
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional (string | undefined)
  username?: string;  // username is optional
  tier: 'free' | 'paid';  // tier is required
  role?: string;  // role is optional
}

// Define AuthRequest interface that extends Express' Request, adding a user object
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is optional and can be undefined
}
