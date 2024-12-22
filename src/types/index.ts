import { Request } from 'express';

// The UserPayload interface defines the structure of the user object
export interface UserPayload {
    id: string;
    email: string;  // Ensure email is always required
    username?: string;  // Optional username
    tier?: string;  // Optional tier
    role?: string;  // Optional role
}

// JwtPayload represents the structure of the JWT token
export interface JwtPayload {
    id: string;
    email: string;  // Email is required for the JWT payload
    username?: string;  // Username is optional in the JWT payload
    tier?: string;  // Optional tier property in JWT token
}

// CustomAuthRequest extends Request with an optional user property, correctly typed
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // user is optional, but its structure matches UserPayload
}

// AuthRequest extends Request for cases where the user is guaranteed to be present
export interface AuthRequest extends Request {
    user: UserPayload;  // `user` is guaranteed to be present (e.g., after JWT verification)
}
