// src/types/index.ts
import { Request } from 'express';  // Import Express's Request type

// Define the UserPayload interface with required email
export interface UserPayload {
  id: string;
  email: string;  // Email is now required (non-optional)
  username?: string;
}

// Define the AuthRequest interface that extends Express's Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is still optional
}
