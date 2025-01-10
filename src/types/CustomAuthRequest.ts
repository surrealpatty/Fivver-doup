import { UserPayload } from './index'; // Ensure './index' is used consistently
import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: UserPayload; // Required user property with UserPayload type
}
