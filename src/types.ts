import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email
  username: string;    // Required: Username
  role?: string;       // Optional: User's role (could be 'admin', 'user', etc.)
  tier?: string;       // Optional: User's subscription tier (could be 'free', 'paid', etc.)
}

// Extend Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user && 
    typeof user.id === 'string' && 
    typeof user.email === 'string' && 
    typeof user.username === 'string' &&
    (user.role === undefined || typeof user.role === 'string') &&
    (user.tier === undefined || typeof user.tier === 'string')
  );  // Checks if all required fields are present and correct
}
