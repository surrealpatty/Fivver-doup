// src/types/index.ts
import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;  // Email is optional, matching the user model
  username?: string;  // Username is optional
  role: string;  // Role added to the UserPayload, which is required
  tier?: string;  // Tier added, optional field for paid/free user
}

// Extend the Express Request interface to include the 'user' property
declare module 'express' {
  export interface Request {
    user?: UserPayload;  // Add user property of type UserPayload to Request
  }
}

// Optionally, you can define a custom AuthRequest type that extends the Request type
export interface AuthRequest extends Request {
  user: UserPayload;  // Ensure user is required here, instead of optional
}
