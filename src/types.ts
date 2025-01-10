// src/types.ts

// Import necessary modules
import { Request } from 'express'; // Ensure correct import of Request

// Define the UserRole enum for user roles
export enum UserRole {
  Admin = 'admin',
  Paid = 'paid',
  User = 'user',
}

// Define the UserTier enum for user tiers
export enum UserTier {
  Free = 'free',
  Paid = 'paid',
}

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
    (user.role === undefined || Object.values(UserRole).includes(user.role)) &&
    (user.tier === undefined || Object.values(UserTier).includes(user.tier))
  );
}

// Define the AuthRequest interface for when a user is guaranteed to exist
export interface AuthRequest extends Request {
  user: UserPayload; // Non-optional user field
}
