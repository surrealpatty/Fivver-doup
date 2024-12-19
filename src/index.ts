// src/types/index.ts
import { Request } from 'express';
import  app  from '../index';  // Use named import instead of default import

// UserPayload interface defines the structure of user data
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';  // Make tier a required field
  role?: 'admin' | 'user'; // Add role as optional
}

// CustomAuthRequest extends Express' Request interface to include user information
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure user object always follows UserPayload structure
}
