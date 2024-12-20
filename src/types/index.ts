import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;          // ID is required
  email?: string;      // Email is optional
  username?: string;   // Username is optional
  tier: string;        // Tier is required (either 'free' or 'paid')
  role?: string;       // Role is optional (either 'admin' or 'user')
}

// Extend Express's Request type to include the user property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Define the user property, which is optional
}
