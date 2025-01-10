// Define UserTier and UserRole types
export type UserTier = 'free' | 'paid';
export type UserRole = 'user' | 'admin' | 'moderator';

// Define the UserPayload interface
export interface UserPayload {
    id: string;
    email?: string;
    username?: string;
    role?: UserRole;  // Role of the user (user, admin, moderator)
    tier?: UserTier;  // Tier of the user (free, paid)
    isVerified?: boolean; // Whether the user is verified
}

// Define AuthRequest interface extending Express Request
export interface AuthRequest extends Request {
    user?: UserPayload;  // Optional user payload attached to request
}

// Define CustomAuthRequest interface extending Express Request
export interface CustomAuthRequest extends Request {
    user: UserPayload;  // User payload is required
}
