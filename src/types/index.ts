import { Request } from 'express';

// Extend roles and tiers as needed
type UserRole = 'admin' | 'paid' | 'user';
type UserTier = 'free' | 'paid';

// Define the user payload structure
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  role?: UserRole;
  tier?: UserTier;
}

// Extend the Request type to include the `user` property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;
}
