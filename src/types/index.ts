// src/types/index.ts

import { Request } from 'express';
import { UserPayload } from './user';  // Import UserPayload from the user file

// Define the AuthRequest interface extending Express' Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // User may or may not be set at first
}

// Define the type guard to check if the user is present
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly check for undefined
}

// Export UserPayload if it's defined here or in the user file
export { UserPayload };
