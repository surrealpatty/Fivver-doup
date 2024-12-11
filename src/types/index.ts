// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: 'free' | 'paid';  // Add the 'tier' property with possible values
}

// Extend Express's Request interface to include the user property and get method
export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' is always defined
  get(name: string): string | undefined;  // Include 'get' method to match Express's signature
}

// Type guard function to check if req.user is a UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';  // Check that 'id' and 'tier' exist
}
