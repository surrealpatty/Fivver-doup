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
 * Augmenting the Express Request interface to include the `user` property.
 * This represents the authenticated user's data extracted from the JWT.
 */
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Optional user object on the request
    }
  }
}

// Ensure this file is treated as a module by exporting an empty object
export {};
