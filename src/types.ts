import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email (string) - It can never be undefined in UserPayload
  username?: string;   // Optional: Username (string or undefined)
  role?: string;       // Optional: Role (string)
  tier?: string;       // Optional: Subscription tier (string)
}

// Define AuthRequest interface to extend Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// CustomAuthRequest extends AuthRequest
export interface CustomAuthRequest extends AuthRequest {}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
