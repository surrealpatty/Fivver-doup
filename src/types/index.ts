import { Request } from 'express';  // Import Request from Express

// The UserPayload interface defines the structure of the user object
export interface UserPayload {
  id: string;
  email: string;  // Email is required and cannot be undefined
  username: string;  // Username is required and cannot be undefined
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

// CustomAuthRequest extends the Request object with a guaranteed user object
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;  // Ensure email is required here as well
    username?: string;  // Username is optional, but email is required
  };
}

// AuthRequest extends Request for cases where the user is guaranteed to be present
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be present (e.g., after JWT verification)
}
