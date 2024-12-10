import { Request } from 'express';
import { UserPayload } from './index';

export interface AuthRequest extends Request {
  user?: UserPayload;  // Ensure user includes all fields of UserPayload
}
