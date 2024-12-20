import { Request } from 'express';

// Assuming this is your UserPayload interface
export interface UserPayload {
  id: string;
  email: string; // Make sure email is always a string
  username: string; // or string | undefined if username can be optional
  role?: string;  // Optional, if role is part of the payload
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // user is no longer undefined
}
