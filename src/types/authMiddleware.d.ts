import { Request } from 'express';

// Define the structure of the user data attached to the request
export interface UserPayload {
  id: string;
  email?: string;  // Optional: email can be omitted
  username?: string;  // Optional: username can be omitted
  tier: string;  // 'tier' is required
}

// Extend the Request interface to include user data
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' object is optional and contains 'id', 'email', 'username', and 'tier'
}
