import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;  // Make sure email is required
  username: string;  // Ensure username is required
  role?: string;
  tier?: string;
}

// AuthRequest extends Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property, as not every request might have a user attached
}

// CustomAuthRequest extends AuthRequest if you prefer to use this specific naming convention
export interface CustomAuthRequest extends AuthRequest {}

// Type guard to check if a user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Check that 'user.id' is a string (you can add more checks if needed)
}
