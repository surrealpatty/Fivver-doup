// src/types/index.ts

import { Request } from 'express';

// Interface for user attributes, including required fields like id, username, and email
export interface IUserAttributes {
  id: string; // UUID or unique identifier for the user
  username: string; // The user's username
  email: string; // The user's email address
  password: string; // The user's hashed password
  isPaid: boolean; // Whether the user has a paid subscription
}

// Interface for creating a user, excludes the 'id' as it's auto-generated
export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {
  // All attributes except 'id' are required for creation
}

// UserPayload interface for authentication or authorization
export interface UserPayload {
  id: string; // The user's ID (required)
  email: string; // The user's email (required)
  username: string; // The user's username (required)
  tier: string; // The user's tier (required)
}

// Extend the Express Request type to include user object
export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user object added after authentication
}

// Interface for service payload, to be used with services in the project
export interface ServicePayload {
  id: string;
  name: string;
  description: string;
}

// Interface for user creation attributes, including only the fields required for creation
export interface UserCreationAttributes {
  email: string;
  password: string;
  username: string;
  isPaid: boolean;
}
