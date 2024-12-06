import { Request } from 'express'; // Import Request from express to extend it

/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string;        // The unique identifier for the user (required)
  email: string;     // Email is required (non-nullable)
  username: string;  // Username is required (non-nullable)
  tier?: string;     // Optional tier for user access (e.g., 'free', 'premium')
  role?: string;     // Optional role information for the user (e.g., 'user', 'admin')
}

/**
 * AuthRequest interface extends the Express Request type to include a `user` property.
 * This property represents the authenticated user's data extracted from the JWT.
 * The `user` property is optional, as it may not be present in all requests.
 */
export interface AuthRequest extends Request {
  user?: UserPayload;  // The `user` property contains the authenticated user's data, if available
}
