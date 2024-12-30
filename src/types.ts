import { Request } from 'express';
import { UserPayload } from '../types'; // Adjust the path as necessary

export interface UserPayload {
  id: string;          // Required: User ID
  email: string;       // Required: Email (string)
  username?: string;   // Optional: Username (string or undefined)
  role?: string;       // Optional: Role (string)
  tier?: string;       // Optional: Subscription tier (string)
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Ensure user is always typed as UserPayload
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
