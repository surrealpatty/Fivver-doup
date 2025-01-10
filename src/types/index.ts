// src/types/index.ts

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
    tier: UserTier;                  // User subscription tier (required)
    isVerified?: boolean;            // Whether the user is verified (optional)
}

// Define the AuthRequest interface extending Express Request with optional user payload
export interface AuthRequest extends Request {
    user?: UserPayload;              // Optional user payload attached to the request
}

// Define the CustomAuthRequest interface extending Express Request with a required user payload
export interface CustomAuthRequest extends Request {
    user: UserPayload;               // User payload is required
}
