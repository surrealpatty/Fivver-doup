import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email (string)
  username?: string;   // Optional: Username (string or undefined)
  role?: string;       // Optional: Role (string)
  tier?: string;       // Optional: Subscription tier (string)
}

// Extend the Express Request interface to include the 'user' property
// 'user' is optional here, indicating that it might be undefined
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // 'user' can be undefined
}

// Define a type guard to check if an object is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || typeof user.role === 'string') &&
    (user.tier === undefined || typeof user.tier === 'string')
  );
}

// Define AuthRequest interface for additional typing needs
// This is used when we are sure that the 'user' property is not undefined
export interface AuthRequest extends Request {
  user: UserPayload;  // 'user' is required here
}
