// src/types/index.ts

// Define UserTier as a union of possible subscription tiers for a user
export type UserTier = 'free' | 'paid';

// Define UserRole as a union of possible user roles
export type UserRole = 'user' | 'admin' | 'moderator'; // Ensure this matches everywhere in the project

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;          // Required: User ID
  email?: string;      // Optional: Email (string)
  username?: string;   // Optional: Username (string or undefined)
  role?: UserRole;     // Optional: Role (restricts to 'admin', 'user', or 'moderator')
  tier?: UserTier;     // Optional: Subscription tier (restricts to 'free' or 'paid')
  isVerified?: boolean; // Optional: Whether the user is verified
}

// Define the AuthRequest interface (extends Express' Request with an optional user field)
export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user field for unauthenticated requests
}

// Define the CustomAuthRequest interface (extends Request with a mandatory user field)
export interface CustomAuthRequest extends Request {
  user: UserPayload; // Ensure 'user' is always present for authenticated requests
}

// Type guard to check if an object is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    (user.email === undefined || typeof user.email === 'string') &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || ['admin', 'user', 'moderator'].includes(user.role)) && // Check if role is valid
    (user.tier === undefined || ['free', 'paid'].includes(user.tier)) && // Check if tier is valid
    (user.isVerified === undefined || typeof user.isVerified === 'boolean') // Check if isVerified is boolean (optional)
  );
}
