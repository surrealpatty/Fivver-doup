import { Request } from 'express';
import { UserPayload } from '../types';  // Adjust the path as necessary

// Extend the Express Request interface to include the 'user' property
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // user is optional here
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
export interface AuthRequest extends Request {
  user: UserPayload;  // user is required here
}