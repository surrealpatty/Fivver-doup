// Define UserRole enum to represent user roles like 'user', 'admin'
export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',  // Add 'moderator' if needed
}

// Define UserTier enum to represent subscription tiers like 'free' and 'paid'
export enum UserTier {
  Free = 'free',
  Paid = 'paid',
}

// Define UserPayload interface for user-related data
export interface UserPayload {
  id: string;               // User ID (required)
  email?: string;           // User email (optional)
  username?: string;        // Username (optional)
  role: UserRole;           // User role (required)
  tier: UserTier;           // Tier (free or paid) (required)
  isVerified?: boolean;     // Verification status (optional)
}
