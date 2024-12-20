import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;  // email can be undefined
  username?: string;  // username is optional
}

// Extend the Express Request interface to include the optional 'user' property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // user can be undefined
}
