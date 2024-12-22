import { Request } from 'express';
import { UserPayload } from './user'; // Ensure UserPayload is imported correctly

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string;  // Email is required in the JWT payload
  username?: string;  // Username is optional in the JWT payload
  tier?: string;  // Optional tier property in JWT token
  role: 'Free' | 'Paid';
}

// CustomAuthRequest extends Express Request with an optional `user` property, matching the UserPayload structure
// This would be used before the JWT validation (where `user` can be undefined)
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional as it may not be set before JWT validation
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This would be used after JWT validation, ensuring `user` is available in the request
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be present after authentication (e.g., JWT verification)
}
