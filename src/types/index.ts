// src/types/index.ts

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;      // Optional email
  username?: string;   // Optional username
}

// Extend the Express Request interface to include user information
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property of type UserPayload
}
