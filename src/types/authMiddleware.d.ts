// src/types/authMiddleware.ts

import { Request } from 'express';

// Define the structure of the user data attached to the request
export interface UserPayload {
  id: string;  // Required: ID of the user
  email?: string;  // Optional: email can be omitted
  username?: string;  // Optional: username can be omitted
  tier: string;  // Required: tier property to define user tier (e.g., 'free' or 'paid')
}

// Extend the Request interface to include user data
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' object is optional and should match the UserPayload structure
}
