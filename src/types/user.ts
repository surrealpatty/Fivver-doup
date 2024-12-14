// src/types/user.ts

// Define the UserPayload interface with required and optional fields
export interface UserPayload {
  id: string;          // Required user ID
  email?: string;      // Optional email
  username?: string;   // Optional username
  tier: string;        // Required user tier (you've mentioned it should be part of UserPayload)
  role?: string;       // Optional user role (for future use)
}

// Define the AuthRequest interface extending Express' Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added when the user is authenticated
}

// Type guard function to check if user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}
