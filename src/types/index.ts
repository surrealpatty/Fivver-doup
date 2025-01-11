// src/types/index.ts

// Define UserRole to represent user roles like 'user', 'admin', and 'moderator'
export type UserRole = 'user' | 'admin' | 'moderator';

// Define UserTier to represent subscription tiers like 'free' or 'paid'
export type UserTier = 'free' | 'paid';

// Define UserPayload interface for user-related data
export interface UserPayload {
  id: string;               // User ID (required)
  email?: string;           // User email (optional)
  username?: string;        // Username (optional)
  role: UserRole;           // User role (required)
  tier: UserTier;           // Tier (free or paid) (required)
  isVerified?: boolean;     // Verification status (optional)
}

// Import the base `Request` type from Express
import { Request } from 'express';

// Define CustomAuthRequest to extend the Request object and include the user field
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // user field to hold the `UserPayload` (optional)
}
