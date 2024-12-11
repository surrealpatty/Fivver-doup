import { Request } from 'express';  // Import Request from express

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;  // Assuming `tier` is part of the UserPayload
}

// Extend the Express Request interface to include the optional 'user' field
export interface AuthRequest extends Request {
  user?: UserPayload; // 'user' is optional
}

// Define the isUser type guard
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string'; // Check that 'user.id' is a string, more checks can be added
}
