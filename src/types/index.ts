// src/types/index.ts

// Define UserRole type for user's role (user, admin, moderator)
export type UserRole = 'user' | 'admin' | 'moderator';

// Define UserTier type for user's subscription tier (free or paid)
export type UserTier = 'free' | 'paid';

// Define the UserPayload interface for user-related data
export interface UserPayload {
  id: string;              // User ID (required)
  email?: string;          // User email (optional)
  username?: string;       // Username (optional)
  role: UserRole;          // User role (required, ensures that `role` is always present)
  tier: UserTier;          // Tier is required (ensures the user always has a tier assigned)
  isVerified?: boolean;    // Whether the user is verified (optional)
}
