import { Request } from 'express';

// Interface for the decoded JWT payload
export interface UserPayload {
  id: string;
  email: string; // Made email a required field
  username?: string;
  tier?: string; // Optional tier field (could be 'free', 'paid', etc.)
}

// Custom request interface to include optional user information
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // user is of type UserPayload and can be optional
}
