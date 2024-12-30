import { Request } from 'express';
import { UserPayload } from '../types';  // Ensure the correct path to 'src/types/index.ts'

// Extend the Express Request interface to include the 'user' property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // 'user' is optional here, indicating it might be undefined
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
