// src/types/index.ts
import { Request } from 'express';  // Import Express's Request type

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;  // Optional email field
  username?: string;  // Optional username field
}

// Define the AuthRequest interface that extends Express's Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach the user property to the Request type
}
