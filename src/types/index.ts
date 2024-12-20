import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;  // Ensure email is always a string
  username: string;  // Ensure username is always a string
  tier: 'free' | 'paid';  // Add tier if necessary
  role?: 'admin' | 'user';  // Optional role
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Make user always required (no undefined)
}
