import { Request } from 'express';

// UserPayload defines the structure of the user object, including the required 'tier' field
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // tier is required here
  role?: 'admin' | 'user'; // Optional role
}

// CustomAuthRequest extends the Express Request object to include user information
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // 'user' is optional as it may not always be set (e.g., unauthenticated users)
}
