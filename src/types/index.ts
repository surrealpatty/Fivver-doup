import { Request } from 'express';

// Define UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;  // Make email optional
  username?: string;
  tier?: string;  // Optional tier property
}

// Define AuthRequest interface extending Express' Request, including 'user' field of type UserPayload
export interface AuthRequest extends Request {
  user?: UserPayload;  // The user property is optional
}
