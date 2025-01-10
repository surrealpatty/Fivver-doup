import { UserPayload } from './index';  // Ensure correct import path for UserPayload
import { Request } from 'express';      // Import Request from Express

export interface AuthRequest extends Request {
  user?: UserPayload;  // Explicitly define 'user' property with UserPayload type
}
