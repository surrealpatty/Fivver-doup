// src/types/index.ts
import { Request } from 'express';
import { UserPayload } from './user';  // Adjust the import path if necessary

// AuthRequest interface extends Request to include user property, which is optional
export interface AuthRequest extends Request {
    user?: UserPayload;  // Make user optional as it's set by middleware (may be missing if not authenticated)
}

// Type guard function to ensure req.user is typed as UserPayload
export const isUser = (user: any): user is UserPayload => {
  return user && typeof user.id === 'string' && typeof user.tier === 'string';  // Adjust the condition based on your user model
};

export { UserPayload };  // Export UserPayload for use elsewhere
