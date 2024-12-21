// Import the base Request type from Express
import { Request } from 'express';

// Define the UserPayload interface properly
export interface UserPayload {
  id: string;               // `id` is required
  email: string;            // `email` should be non-optional as expected by your logic
  username?: string;        // `username` is optional
}

// Extend Express's Request to include `user` as an optional property
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // `user` is optional and will be set by the middleware if the token is valid
}
