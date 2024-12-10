import { Request } from 'express';

// Define the AuthRequest interface by extending the Express Request interface
export interface AuthRequest extends Request {
    user?: any;  // Define the type for the `user` property
    id: string;
    email?: string;  // Optional email field
    username?: string;  // Optional username field
    tier: 'free' | 'paid';  // Enum-like field for user tier
    [key: string]: any;  // Allow for additional properties if necessary
}
export interface UserPayload {
    id: string;
    email?: string;  // Optional email field
    username?: string;  // Optional username field
    tier: 'free' | 'paid';  // Enum-like field for user tier
  }