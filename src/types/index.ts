import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;           // Required: User ID
  email: string;        // Required: Email (string) - cannot be undefined
  username?: string;    // Optional: Username (string or undefined)
  tier: 'free' | 'paid'; // Required: User's subscription tier (restricted to 'free' or 'paid')
  role?: 'admin' | 'user'; // Optional: User's role (either 'admin' or 'user')
  orderId: string;
  userId: string;
  amount: number;
  status: string;
}

// Define AuthRequest interface to extend Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// CustomAuthRequest extends AuthRequest for any specific customizations
export interface CustomAuthRequest extends AuthRequest {
  // The user can still be undefined, but we have ensured that `email` is a required field in `UserPayload`
  user?: UserPayload;
}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
