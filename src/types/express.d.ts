import { UserPayload } from './index';  // Correct import path

declare global {
  namespace Express {
    // Extend Express.Request to include the custom 'user' property with type UserPayload
    interface Request {
      user?: {
        id: string;
        email?: string;
        username?: string;
        tier?: string; // Ensure consistency with your UserPayload
      };
    }
  }
}
