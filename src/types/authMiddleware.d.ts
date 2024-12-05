// src/types/authMiddleware.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload for token structure

// Define the expected structure of the User payload in the JWT
export interface UserPayload extends JwtPayload {
  id: string;         // Add any properties you expect in the JWT payload
  email?: string;
  username?: string;
  tier?: string;      // Example of adding a 'tier' property if it exists
}

// Extend the Express Request interface to include `user` property
export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach UserPayload to req.user
}
