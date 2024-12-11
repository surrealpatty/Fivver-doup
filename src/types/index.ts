// src/types/index.ts
import { Request } from 'express';

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // Ensuring that 'tier' is always part of UserPayload
  role?: string; // Optional, if you want to include roles in the future
}

// Define the AuthRequest interface by extending the Express Request interface
export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure the `user` property is of type UserPayload, including tier
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // Ensure tier is explicitly defined for this request type
  [key: string]: any;  // Allow for additional properties if necessary
}

// If you have an OrderRequest type (as referenced in your errors)
export interface OrderRequest extends Request {
  user?: UserPayload;  // Ensure the `user` property is of type UserPayload, including tier
  // Add other properties specific to order requests if needed
}
