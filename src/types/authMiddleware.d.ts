import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for token structure

// Define the expected structure of the User payload in the JWT
export interface UserPayload extends JwtPayload {
  id: string;         // User's unique identifier
  email?: string;     // Optional email
  username?: string;  // Optional username
  tier?: string;      // Optional subscription tier (e.g., 'free', 'paid')
}

// Extend the Express Request interface to include `user` property
export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach the UserPayload type to the req.user property
}
