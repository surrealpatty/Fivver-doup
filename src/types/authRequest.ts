// src/types/authRequest.ts
import { Request } from 'express';
import { UserPayload } from './user';  // Correct path to UserPayload

// AuthRequest interface where user is optional (could be undefined if not authenticated)
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is of type UserPayload or undefined
}

// CustomAuthRequest interface where user is always defined (non-optional)
export interface CustomAuthRequest extends AuthRequest {
  user: UserPayload;  // CustomAuthRequest expects user to always be defined
}
