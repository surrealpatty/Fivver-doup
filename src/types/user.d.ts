import { Request } from 'express';

// IUserAttributes interface for model instances (used after the user is created)
export interface IUserAttributes {
  id: string; // UUID or unique identifier for the user
  username: string; // The user's username
  email: string; // The user's email address
  password: string; // The user's hashed password
  isPaid: boolean; // Whether the user has a paid subscription
}

// IUserCreationAttributes interface for user creation (used before the user is created)
export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {
  // All attributes except 'id' are required for creation
  // The 'id' will be auto-generated, so it is omitted here
}

// UserPayload interface for user-related data passed with the request (e.g., JWT)
export interface UserPayload {
  id: string; // The user's ID (required)
  email?: string; // The user's email (optional)
  username?: string; // The user's username (optional)
}

// Optionally, you could assert that `email` and `username` are never `undefined` in the request context
// when they are expected, as in the AuthRequest type where we assume user data is available after auth.
export interface AuthRequest extends Request {
  user?: Omit<UserPayload, 'email'> & { email: string }; // Make email a required string in this case
}
