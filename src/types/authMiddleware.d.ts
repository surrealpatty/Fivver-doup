import { Request } from 'express';
import { UserPayload } from './index';  // Assuming UserPayload is the correct type for user

export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure 'tier' is included in the UserPayload
}

