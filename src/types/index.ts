import { Request } from 'express';
import { UserPayload } from './UserPayload';  // Correctly import UserPayload

// Define AuthRequest interface to extend Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// CustomAuthRequest extends AuthRequest for any specific customizations
export interface CustomAuthRequest extends AuthRequest {
  user?: UserPayload;  // Ensure the user field matches UserPayload
}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Ensure 'user.id' is a string
}
