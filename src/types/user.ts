// src/types/user.ts 
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: string;  // Ensure tier is part of UserPayload
  role?: string;  // Optional, if you want to include roles in the future
}
// Define the AuthRequest interface extending Express' Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // User may or may not be set at first
}

// Define the type guard to check if the user is present
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly check for undefined
}