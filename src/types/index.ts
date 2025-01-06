// Define UserRole type for user roles
export type UserRole = 'admin' | 'paid' | 'user';  // Roles that can be assigned to a user

// Define UserTier type for user tiers
export type UserTier = 'free' | 'paid';  // User tiers indicating free or paid access

// Define the user payload structure
export interface UserPayload {
  id: string;         // Unique identifier for the user
  email?: string;     // User's email (optional)
  username?: string;  // User's username (optional)
  role?: UserRole;    // User's role (admin, paid, user)
  tier: UserTier;     // User's tier (free or paid)
  isVerified?: boolean;  // Whether the user's email is verified (optional)
}
