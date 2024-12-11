import { Request } from 'express';
import { UserPayload } from './index';  // Import UserPayload type

export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure 'user' has the required fields, including 'tier'
}