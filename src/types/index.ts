import { Request } from 'express';

// The UserPayload interface defines the structure of the user object, including the required 'tier' field
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid'; // tier is required here
  role?: 'admin' | 'user'; // Optional role
}

// The CustomAuthRequest interface extends the Request object, making 'user' optional, but with the correct type
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // 'user' is optional as it may not always be set (e.g., unauthenticated users)
}
