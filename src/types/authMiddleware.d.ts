import { Request } from 'express';

/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: string;  // Added 'tier' field here
}

/**
 * Augment the Express Request interface to include both `user` and `userId` properties.
 * This ensures the authenticated user and their ID are available in the request object.
 */
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Optional user object containing the user data from JWT
      userId?: number;     // Optional userId property to store the user's ID
    }
  }
}

// Define and export the AuthRequest interface that extends Express.Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user data from JWT, including the 'tier' field
  userId?: number;     // Optional userId property
}

// This ensures the file is treated as a module.
export {};
