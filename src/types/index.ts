// src/types/index.ts

import { Request } from 'express';

// CustomAuthRequest extends the Express Request object to include user information
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    tier: 'free' | 'paid' | undefined;  // Ensure 'tier' is correctly typed
    email?: string;
    username?: string;
  };
}

// UserPayload interface represents the payload of a user in your application
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}
