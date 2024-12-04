// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier?: string;  // Mark 'tier' as optional
}

// Extend the Express Request type to include an optional 'user' object
export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user object added after authentication
}
