import { Request } from 'express';

// User payload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;
  tier?: string;
}

// AuthRequest extends Express' Request with an optional user field
export interface AuthRequest extends Request {
  user?: UserPayload;
}

// Define the isUser type guard to validate UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Check that 'user.id' is a string (more checks can be added if needed)
}
