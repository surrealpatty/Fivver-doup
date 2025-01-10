import { Request } from 'express';
import { UserPayload } from './index'; // Ensure this is consistent with your types file

// AuthRequest interface where user is optional (could be undefined if not authenticated)
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is of type UserPayload or undefined
}
