import { Request } from 'express';

/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string;      // User ID
  email: string;   // User email address
  username: string; // User's username
  tier: string;    // User tier (e.g., 'free' or 'paid')
}

/**
 * Augment the Express Request interface to include both `user` and `userId` properties.
 * This ensures the authenticated user and their ID are available in the request object.
 */
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Optional user object containing the user data from JWT
      userId?: number;     // Optional userId property to store the user's ID (could be redundant if 'user' is present)
    }
  }
}

// Define and export the AuthRequest interface that extends Express.Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user data from JWT, including the 'tier' field
  userId?: number;     // Optional userId property (should be consistent with the rest of the app)
}

// This ensures the file is treated as a module, preventing it from being interpreted as a script.
export {};
