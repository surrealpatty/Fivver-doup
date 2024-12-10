import { Request } from 'express';
import { UserPayload } from './index';  // Import the correct path to UserPayload

export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach UserPayload type to the `user` property
}
