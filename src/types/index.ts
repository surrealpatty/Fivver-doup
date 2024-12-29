import { Request } from 'express';

// UserPayload represents the user information
// email is required now, and tier is added if needed
export interface UserPayload {
  id: string;
  email: string;  // Ensure email is required (string)
  username?: string;
  tier?: string;  // 'tier' added as part of your user model
}

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string;  // Ensure email is required in the JWT payload
  username?: string;  // Optional username in the JWT payload
  tier?: string;  // Optional tier in the JWT token
  role: 'Free' | 'Paid';  // Define role as 'Free' or 'Paid'
}

// CustomAuthRequest extends Express Request with an optional `user` property
// This would be used before JWT validation where `user` can be undefined
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional; it may be set after JWT validation
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This would be used after JWT validation, ensuring `user` is available in the request
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed after authentication (e.g., after JWT verification)
}
