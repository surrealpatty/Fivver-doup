// src/types/index.ts

import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;      // Make sure email is required
  username: string;   // Make sure username is required
}

// Extend the Express Request interface to include user information
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property of type UserPayload
}
