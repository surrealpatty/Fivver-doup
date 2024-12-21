import { Request } from 'express';

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;               // User ID
  email?: string;           // Email address of the user (optional)
  username?: string;        // Username of the user (optional)
  tier: 'free' | 'paid';    // Tier (either 'free' or 'paid')
  role?: 'admin' | 'user';  // Optional role
}

// Define the AuthRequest interface (extends Express' Request with an optional user field)
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added when the user is authenticated
}

// Define the CustomAuthRequest interface (extends Request with a mandatory user field)
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' is always present (non-optional)
}

// Type guard to check if user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}
