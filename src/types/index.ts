import { Request } from 'express';

// Define roles and tiers as needed
export type UserRole = 'admin' | 'paid' | 'user'; // Can extend with more roles
export type UserTier = 'free' | 'paid'; // Can extend with more tiers

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
  user?: UserPayload; // Optional user property in the request
}
