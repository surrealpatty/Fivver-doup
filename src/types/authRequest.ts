import { UserPayload } from './index'; // Ensure './index' is used consistently
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: UserPayload; // Optional user property with UserPayload type
}
