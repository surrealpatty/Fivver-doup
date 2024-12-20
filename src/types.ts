import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email (string) - It can never be undefined in UserPayload
  username?: string;   // Optional: Username (string or undefined)
  role?: string;       // Optional: Role (string)
  tier?: string;       // Optional: Subscription tier (string)
}

// Extend the Express Request interface to include the user property
// CustomAuthRequest will be the version of the request object that includes an optional 'user' field
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Optional user field (UserPayload or undefined)
}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
