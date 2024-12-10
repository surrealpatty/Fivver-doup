// src/types/index.ts

import { Request } from 'express';

// Define the AuthRequest type extending the Request interface
export interface AuthRequest extends Request {
  user?: any;  // Adding a user property to store the authenticated user info
}
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: string;  // Add role as optional, or required based on your needs
  tier: "free" | "paid";  // Add this line
}

