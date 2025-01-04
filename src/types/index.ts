// src/types/index.ts

// Define roles and tiers as needed
export type UserRole = 'admin' | 'paid' | 'user';  // Roles that can be assigned to a user
export type UserTier = 'free' | 'paid';  // User tiers indicating free or paid access

// Define the user payload structure
export interface UserPayload {
  id: string;         // Unique identifier for the user
  email?: string;     // User's email (optional)
  username?: string;  // User's username (optional)
  role?: UserRole;    // User's role (admin, paid, user)
  tier?: UserTier;    // User's tier (free, paid)
  // Removed isPaid property to avoid redundancy since tier handles it
}

// Import Request from express to extend it
import { Request } from 'express';

// Extend the Request type to include the `user` property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Optional user property in the request
}
