// src/types/index.ts
import { Request } from 'express';

// Define UserPayload to describe the structure of the user object in the JWT
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;
  role?: string;
}

// Extend the Express Request interface to include the user information
export interface AuthRequest extends Request {
  user?: UserPayload;  // Reference the UserPayload type
}
