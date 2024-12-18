import { Request } from 'express';

// Define the UserPayload interface
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: 'free' | 'paid';  // Optional tier property, can be 'free' or 'paid'
  role?: 'admin' | 'user';  // Optional role property, can be 'admin' or 'user'
}

// Define CustomAuthRequest that extends Express's Request type
// CustomAuthRequest adds an optional 'user' field to the request
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Optional 'user' field of type UserPayload
}

// Define AuthRequest where the 'user' field is required (for routes where authentication is guaranteed)
// This ensures that 'user' is present on the request in these routes
export interface AuthRequest extends Request {
  user: UserPayload;  // Required 'user' field, assumes authentication is guaranteed
}
