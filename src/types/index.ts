import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;  // Make email optional
  username: string;  // Make username optional
  tier?: string;  // Optional tier
  role?: string;  // Optional role
}

// JwtPayload interface to represent the structure of the JWT token
export interface JwtPayload {
  id: string;
  email?: string;  // email can be undefined in the JWT
  username?: string;  // username can be undefined in the JWT
  tier?: string;  // Optional tier property for the JWT token payload
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // UserPayload can be undefined
}

// AuthRequest extends Request for cases where the user is guaranteed to be authenticated
export interface AuthRequest extends Request {
  user: UserPayload;  // user is guaranteed to be present
}
