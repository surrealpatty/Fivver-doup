import { Request } from 'express';

/**
 * IUserAttributes interface represents the attributes of a user model instance
 * (used after the user is created in the database).
 */
export interface IUserAttributes {
  id: string; // UUID or unique identifier for the user
  username: string; // The user's username
  email: string; // The user's email address
  password: string; // The user's hashed password
  isPaid: boolean; // Whether the user has a paid subscription
}

/**
 * IUserCreationAttributes interface is used for creating new user instances.
 * This interface excludes the `id` field, as it is auto-generated.
 */
export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {
  // All attributes except 'id' are required for creation.
}

/**
 * UserPayload interface represents the payload data embedded in a JWT token.
 * It contains essential user information for authentication.
 */
export interface UserPayload {
  id: string; // The user's ID (required)
  email: string; // The user's email (required)
  username: string; // The user's username (required)
}

/**
 * AuthRequest interface extends the Express Request type to include a `user` property.
 * This property represents the authenticated user's data extracted from the JWT.
 */
export interface AuthRequest extends Request {
  user?: UserPayload; // `user` is optional and is added after token validation
}
