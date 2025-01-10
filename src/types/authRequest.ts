import { Request } from 'express';
import { UserPayload } from './index';  // Import from correct path

// AuthRequest interface where user is optional (could be undefined if not authenticated)
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is of type UserPayload or undefined
}
