// src/types/index.ts
import { Request } from 'express';

// UserPayload interface for authentication or authorization, includes the 'tier' field
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: string; // Add this field to represent the user's subscription tier (free or paid)
}

// Extend the Express Request type to include an optional 'user' object
export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user object added after authentication
}
