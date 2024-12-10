// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;  // Email and username should be optional to match Express's declaration
  username?: string;
  role: string;     // Role added to the UserPayload
  tier: 'free' | 'paid';  // Restrict tier to either 'free' or 'paid'
}

// Extend the Express Request interface to include the 'user' property
declare module 'express' {
  export interface Request {
    user?: UserPayload;  // Add user property of type UserPayload to Request
  }
}
