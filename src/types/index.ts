import { Request } from 'express';

// Assuming this is your UserPayload interface
export interface UserPayload {
  id: string;
  username: string;
  email: string; // Ensure email is always a string
  tier: string;  // Assuming this is part of the user object
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // user is no longer undefined
}
