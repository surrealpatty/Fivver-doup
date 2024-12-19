// src/types/index.ts

import { Request } from 'express';  // Import the base Request type from Express

// Extend the base Request type to include a custom `user` property
export interface CustomAuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
    tier?: 'free' | 'paid';  // Optional, depending on user authentication
    role?: 'admin' | 'user';  // Optional, depending on user authentication
  };
}

// Define the UserPayload interface (this is different from `CustomAuthRequest`)
// This can be used for data that is directly related to user authentication (e.g., during registration or login)
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}
