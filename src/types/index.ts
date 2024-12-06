/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string;       // The unique identifier for the user
  email: string;    // The email of the user, assuming it's part of the JWT payload
  username: string; // The username of the user, assuming it's part of the JWT payload
}

/**
 * AuthRequest interface extends the Express Request type to include a `user` property.
 * This property represents the authenticated user's data extracted from the JWT.
 */
export interface AuthRequest extends Request {
  user?: UserPayload; // The `user` property is optional and contains the authenticated user data
}
