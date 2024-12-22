// UserPayload represents the user information
// email is required now, and tier is added if needed
export interface UserPayload {
  id: string;
  email: string;  // Make email a required string
  username?: string;
  tier?: string;  // Add the 'tier' field, assuming it's part of your user model
}

// JwtPayload represents the structure of the JWT token payload
export interface JwtPayload {
  id: string;
  email: string;  // Email is required in the JWT payload
  username?: string;  // Username is optional in the JWT payload
  tier?: string;  // Optional tier property in JWT token
  role: 'Free' | 'Paid';  // Define the role property (Free or Paid)
}

// CustomAuthRequest extends Express Request with an optional `user` property
// This would be used before JWT validation where `user` can be undefined
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // `user` is optional as it may not be set before JWT validation
}

// AuthRequest extends Express Request for cases where the `user` property is guaranteed to be present
// This would be used after JWT validation, ensuring `user` is available in the request
export interface AuthRequest extends Request {
  user: UserPayload;  // `user` is guaranteed to be present after authentication (e.g., JWT verification)
}
