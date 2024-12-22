// src/types/index.ts

export interface UserPayload {
  id: string;
  email: string;  // Make email required
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

// CustomAuthRequest extends Request with an optional user property, ensuring user matches UserPayload
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // user is optional, but matches UserPayload interface
}

// AuthRequest extends Request for cases where the user is guaranteed to be present
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be present (e.g., after JWT verification)
}
