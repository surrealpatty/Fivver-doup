// src/types/index.ts

import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;  // Make email required
  username?: string;
  tier?: string;
  role?: string;
}

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string;  // Email is required in the JWT payload
  username?: string;  // Username is optional in the JWT payload
  tier?: string;  // Optional tier property in JWT token
}

// CustomAuthRequest extends Express Request with a mandatory `user` property, matching the UserPayload structure
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Keep `user` optional (it can be undefined)
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This would be the case after the JWT token is validated and the user data is attached to the request
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be present after authentication (e.g., JWT verification)
}
