// src/types/index.ts

// Define possible roles with correct string values
export type UserRole = 'user' | 'admin'; // UserRole defines user roles

// Ensure UserPayload contains the proper structure and role type
export interface UserPayload {
    id: string;              // User ID (required)
    email?: string;          // Email is optional
    username?: string;       // Username is optional
    tier?: string;           // Tier is optional, can be used for distinguishing between free/paid users
    role?: UserRole;         // Role is optional and matches UserRole
}

// Extend the Express Request type to include the user object (CustomAuthRequest)
export interface CustomAuthRequest extends Request {
    user?: UserPayload;      // `user` is optional and matches the UserPayload interface
}
