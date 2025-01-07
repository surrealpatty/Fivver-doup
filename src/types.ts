// src/types.ts
import { Request } from 'express';

// Define the UserRole type for user roles (more specific than a string)
export type UserRole = 'admin' | 'paid' | 'user'; // Specific roles

// Define the UserTier type for user tiers
export type UserTier = 'free' | 'paid'; // User tiers indicating free or paid access

// UserPayload interface
export interface UserPayload {
  id: string;            // Required: User ID
  email?: string;        // Optional: Email (string)
  username?: string;     // Optional: Username (string or undefined)
  role?: UserRole;       // Optional: Role (restricts to 'admin', 'paid', or 'user')
  tier?: UserTier;       // Optional: Subscription tier (restricts to 'free' or 'paid')
  isVerified?: boolean;  // Optional: Whether the user is verified
}

// CustomAuthRequest interface extends Request and adds the user field typed as UserPayload
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Optional user field of type UserPayload
}

// Define a type guard to check if an object is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    (user.email === undefined || typeof user.email === 'string') &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || ['admin', 'paid', 'user'].includes(user.role)) && // Check if role is valid
    (user.tier === undefined || ['free', 'paid'].includes(user.tier)) // Check if tier is valid
  );
}

// Define AuthRequest interface for additional typing needs when user is guaranteed to exist
export interface AuthRequest extends Request {
  user: UserPayload;  // Assuming user will always exist, so no need for optional
}
