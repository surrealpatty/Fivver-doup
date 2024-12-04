import { Request } from 'express';

/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string;
  email: string;
  username: string;
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

// This ensures the file is treated as a module.
export {};
