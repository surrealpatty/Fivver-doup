import { Request } from 'express';

// Update UserPayload to make email and username optional
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;  // Make username optional
  tier?: string;  // Optional tier property (can be used for different user types)
}

// JwtPayload interface to represent the structure of the JWT token
export interface JwtPayload {
  id: string;
  email?: string;  // email can be undefined in the JWT
  username?: string;  // username can be undefined in the JWT
  tier?: string;  // Optional tier property for the JWT token payload
}

// CustomAuthRequest extends Express's Request to include an optional user property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // user can be undefined if not authenticated
}

// AuthRequest extends Request for cases where the user is guaranteed to be authenticated
export interface AuthRequest extends Request {
  user: UserPayload;  // user is guaranteed to be present
}
