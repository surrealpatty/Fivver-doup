// Define UserTier type for user's subscription tier (free or paid)
export type UserTier = 'free' | 'paid';  

// Define UserRole type for user's role (user, admin, moderator)
export type UserRole = 'user' | 'admin' | 'moderator';  

// Define the UserPayload interface for user-related data
export interface UserPayload {
    id: string;                      // User ID (required)
    email?: string;                  // User email (optional)
    username?: string;               // Username (optional)
    role?: UserRole;                 // User role (optional)
    tier: UserTier;                  // Tier is now required, no longer optional
    isVerified?: boolean;            // Whether the user is verified (optional)
}
