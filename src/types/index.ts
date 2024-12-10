import { Request } from 'express';

// Define the AuthRequest type extending the Request interface
export interface AuthRequest extends Request {
  user?: UserPayload;  // Store the authenticated user info
}

export interface UserPayload {
  id: string;
  email: string;  // Ensure email is always a string (not optional)
  username: string;  // Make username required
  role?: string;  // Optional role field
  tier: "free" | "paid";  // Define tier as either "free" or "paid"
}
