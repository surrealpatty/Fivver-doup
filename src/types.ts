// src/types.ts

// Define UserRole enum for user's role (user, admin, moderator)
export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}

// Define UserTier enum for user's subscription tier (free or paid)
export enum UserTier {
  Free = 'free',
  Paid = 'paid',
}

// Define the UserPayload interface for user-related data
export interface UserPayload {
  id: string;              // User ID (required)
  email?: string;          // User email (optional)
  username?: string;       // Username (optional)
  role?: UserRole;         // User role (optional)
  tier: UserTier;          // Tier is now required, no longer optional
  isVerified?: boolean;    // Whether the user is verified (optional)
}

// Ensure the CustomAuthRequest extends Request correctly
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user field of type UserPayload
}

// Type guard to check if the user is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    (user.email === undefined || typeof user.email === 'string') &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || Object.values(UserRole).includes(user.role)) &&
    (user.tier === undefined || Object.values(UserTier).includes(user.tier))
  );
}

// AuthRequest for when a user is guaranteed to exist
export interface AuthRequest extends Request {
  user: UserPayload; // Non-optional user field
}
