// src/types/index.ts

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: UserTier; // Ensure tier is always defined, use 'UserTier' enum
  role: UserRole; // Ensure role is always defined, use 'UserRole' enum
}

// Enum to define user tiers
export enum UserTier {
  Free = 'free', // For free-tier users
  Paid = 'paid', // For paid-tier users
}

// Enum to define user roles
export enum UserRole {
  Admin = 'admin', // For admin users
  User = 'user',   // For regular users
  Guest = 'guest', // For guest users
}
