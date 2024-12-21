// src/types/index.ts
import { UserPayload } from '@user';  // Import UserPayload from user.ts
import { AuthRequest, CustomAuthRequest } from '@typesauthRequest';  // Import AuthRequest and CustomAuthRequest from authRequest.ts

// Define the UserPayload interface (for authenticated user details)
export interface UserPayload {
  id: string;               // User ID
  email?: string;           // Email address of the user (optional)
  username?: string;        // Username of the user (optional)
  tier: 'free' | 'paid';    // Tier (either 'free' or 'paid')
  role?: 'admin' | 'user';  // Optional role
}

// Define the AuthRequest interface (extends the basic Request interface with an optional user property)
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user (for unauthenticated requests)
}

// Define the CustomAuthRequest interface (extends Request with a mandatory user property)
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure user is never undefined
}

// Type guard to check if the user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}

// Export the interfaces if needed in other files
export { AuthRequest, CustomAuthRequest, UserPayload };