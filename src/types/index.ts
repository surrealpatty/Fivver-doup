// src/types/index.ts

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
}

// Define the AuthRequest interface extending Express's Request
export interface AuthRequest extends Request {
  user?: UserPayload; // The user is optional, following the UserPayload structure
}

// Type guard to check if the user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
return req.user !== undefined; // Explicitly checks if the user is set in the request
}
