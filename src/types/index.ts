import { Request } from 'express';
import { UserPayload } from './user';  // Ensure this path is correct

// AuthRequest interface extends Request to include user property, which is optional
export interface AuthRequest extends Request {
  user?: UserPayload;  // Make 'user' optional to handle undefined cases
}

// Type guard to ensure req.user is of type UserPayload
export const isUser = (user: any): user is UserPayload => {
  return (user && typeof user.id === 'string');
};

// Export UserPayload for use elsewhere
export { UserPayload };
