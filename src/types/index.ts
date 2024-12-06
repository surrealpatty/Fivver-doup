// src/types/index.ts
import { Request } from 'express';  // Import Express's Request type

// Define the UserPayload interface with optional fields
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

// Define the AuthRequest interface that extends Express's Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // Make `user` optional
}
