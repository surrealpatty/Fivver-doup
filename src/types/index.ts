import { Request } from 'express';

// UserPayload represents the user information after authentication
export interface UserPayload {
  id: string;
  email: string; // Email is required in UserPayload
  username?: string; // Optional username
  tier?: string; // Optional 'tier' field, part of the user model
}

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string; // Email is required in the JWT payload
  username?: string; // Optional username in the JWT payload
  tier?: string; // Optional tier in the JWT token
  role: 'Free' | 'Paid'; // Define role as 'Free' or 'Paid'
}

// CustomAuthRequest extends Express Request to include the user property
// Now, the user property is mandatory and is always available after JWT validation
export interface CustomAuthRequest extends Request {
  user: UserPayload; // user is now mandatory after authentication
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This interface should be used after JWT validation
export interface AuthRequest extends Request {
  user: UserPayload; // user is guaranteed to be available after authentication
}
