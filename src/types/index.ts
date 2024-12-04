// src/types/index.ts

import { Request } from 'express';

// Interface for user attributes, including required fields like id, username, and email
export interface IUserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  isPaid: boolean;
}

// Interface for creating a user, excludes the 'id' as it's auto-generated
export interface IUserCreationAttributes extends Omit<IUserAttributes, 'id'> {}

// UserPayload interface for authentication or authorization
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: string; // Add this field
}

// Extend the Express Request type to include user object
export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user object added after authentication
}

// Other interfaces here...
