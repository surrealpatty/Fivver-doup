import { Request } from 'express';

// UserPayload represents the user information after authentication
export interface UserPayload {
  id: string;
  email: string;  // Email is required in UserPayload
  username?: string;
  tier?: string;  // 'tier' added as part of your user model
}

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string;  // Email is required in the JWT payload
  username?: string;  // Optional username in the JWT payload
  tier?: string;  // Optional tier in the JWT token
  role: 'Free' | 'Paid';  // Define role as 'Free' or 'Paid'
}

// CustomAuthRequest extends Express Request to include the optional `user` property
// `user` can be undefined before authentication, meaning the user may not be present in the request until authentication is completed
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional and can be undefined before JWT validation
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This interface should be used after JWT validation, ensuring that `user` is always available in the request
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be available after authentication (e.g., after JWT verification)
}
