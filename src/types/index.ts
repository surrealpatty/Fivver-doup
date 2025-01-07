// src/types/index.ts (or src/types.ts)

export type UserRole = 'admin' | 'paid' | 'user'; // User roles, adjust as needed

export type UserTier = 'free' | 'paid'; // User tiers indicating free or paid access

// Define the user payload structure
export interface UserPayload {
  id: string;           // Unique identifier for the user
  email?: string;       // User's email (optional)
  username?: string;    // User's username (optional)
  tier: UserTier;       // User's tier (free or paid) [Required]
  role?: UserRole;      // User's role (optional, admin/paid/user)
  isVerified?: boolean; // Whether the user's email is verified (optional)
}
