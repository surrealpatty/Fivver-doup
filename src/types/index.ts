// Import the base Request type from Express
import { Request } from 'express';

// Define the UserPayload interface properly
export interface UserPayload {
  id: string;               // `id` is required
  email: string;            // `email` should be non-optional as expected by your logic
  username: string;        // `username` is optional
  teir?: string;
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' has the correct type (i.e., UserPayload)
}
export interface AuthRequest extends Request {
  user: UserPayload;
}