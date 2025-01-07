// src/types/index.ts

// Define the UserTier type
export type UserTier = 'free' | 'paid';  // You can adjust the tiers as needed

// Define the UserPayload interface with tier as a required property
export interface UserPayload {
    id: string;            // User's ID
    email: string;         // User's email
    username: string;      // User's username
    tier: UserTier;        // Tier is now required (no longer optional)
}
