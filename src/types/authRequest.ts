import { Request } from 'express';
import { UserPayload } from './user';  // Correct path to UserPayload

export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user (might be undefined if not authenticated)
}

export interface CustomAuthRequest extends AuthRequest {
  user: UserPayload;  // CustomAuthRequest always expects user to be defined
}
