// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface with 'tier' as a required field
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // 'tier' is required now
  role?: string; // Optional, if you want to include roles in the future
}

// Define the AuthRequest interface by extending the Express Request interface
export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure the `user` property is of type UserPayload, including 'tier'
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // Ensure 'tier' is explicitly defined for this request type
  [key: string]: any;  // Allow for additional properties if necessary
}

// If you have an OrderRequest type (as referenced in your errors)
export interface OrderRequest extends Request {
  user?: UserPayload;  // Ensure the `user` property is of type UserPayload, including 'tier'
  // Add other properties specific to order requests if needed
}

// Type Guard to assert that 'req.user' is correctly typed as UserPayload
export function isUserPayload(user: any): user is UserPayload {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';
}
