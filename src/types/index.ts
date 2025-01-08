// src/types/index.ts

// Define the possible subscription tiers for a user
export type UserTier = 'free' | 'paid';

// Define the possible roles for a user
export type UserRole = 'user' | 'admin';

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;          // Required: User ID
  email?: string;      // Optional: Email (string)
  username?: string;   // Optional: Username (string or undefined)
  role?: UserRole;     // Optional: Role (restricts to 'admin', 'paid', or 'user')
  tier?: UserTier;     // Optional: Subscription tier (restricts to 'free' or 'paid')
  isVerified?: boolean; // Optional: Whether the user is verified
}

// CustomAuthRequest interface extends Express' Request and adds the user field typed as UserPayload
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Optional user field of type UserPayload
}

// Define a type guard to check if an object is a valid UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    (user.email === undefined || typeof user.email === 'string') &&
    (user.username === undefined || typeof user.username === 'string') &&
    (user.role === undefined || ['admin', 'user'].includes(user.role)) && // Check if role is valid
    (user.tier === undefined || ['free', 'paid'].includes(user.tier)) && // Check if tier is valid
    (user.isVerified === undefined || typeof user.isVerified === 'boolean') // Check if isVerified is boolean (optional)
  );
}
