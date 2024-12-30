import { Request } from 'express';

// Interface for the decoded JWT payload
export interface UserPayload {
  id: string;
  email: string; // Ensure email is always a string
  username?: string;
  tier?: string; // Optional tier field (could be 'free', 'paid', etc.)
}

// Custom request interface to include optional user information
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Ensure user is of type UserPayload
}
