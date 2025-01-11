import { Request } from 'express'; // Import Request from Express

// Define possible roles with correct string values
export type UserRole = 'user' | 'admin' | 'moderator'; // UserRole defines user roles

// Define UserTier type for user's subscription tier (free or paid)
export type UserTier = 'free' | 'paid';  // Defining the user tier

// Define the UserPayload interface for user-related data
export interface UserPayload {
  id: string;               // User ID (required)
  email?: string;           // User email (optional)
  username?: string;        // Username (optional)
  role: UserRole;           // User role (required)
  tier: UserTier;           // Tier is required
  isVerified?: boolean;     // Whether the user is verified (optional)
}

// Define CustomAuthRequest by extending the Request object from express
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // Attach UserPayload to the request, optional
}
