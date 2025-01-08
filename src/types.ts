import { Request } from 'express'; // Ensure correct import of Request

// Define the UserRole type for user roles
export type UserRole = 'admin' | 'paid' | 'user';

// Define the UserTier type for user tiers
export type UserTier = 'free' | 'paid';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  role?: UserRole;
  tier?: UserTier;
  isVerified?: boolean;
}

// Define the CustomAuthRequest interface
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user field of type UserPayload
}

// Define a type guard to check if an object is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    (user.email === undefined || typeof user.email === 'string') &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || ['admin', 'paid', 'user'].includes(user.role)) &&
    (user.tier === undefined || ['free', 'paid'].includes(user.tier))
  );
}

// Define the AuthRequest interface for when a user is guaranteed to exist
export interface AuthRequest extends Request {
  user: UserPayload; // Non-optional user field
}
