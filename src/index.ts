import { Request } from 'express';

// Extending Express Request to add a custom 'user' property
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    username?: string;
    tier?: string;  // Optional property for the user's tier (e.g., 'free' or 'paid')
    role?: string;   // Optional property for the user's role (e.g., 'admin' or 'user')
  };
}
