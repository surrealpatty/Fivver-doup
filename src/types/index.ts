// src/types/index.ts
import { Request } from 'express';
import { UserPayload } from './user';  // Import UserPayload from your user model

export interface AuthRequest extends Request {
  user?: UserPayload;  // User can be undefined if not authenticated
}

// Define the type guard to check if the user is present
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly check for undefined
}

export { UserPayload };  // Export UserPayload for use elsewhere
