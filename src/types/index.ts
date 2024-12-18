// src/types/index.ts
import { Request } from 'express';

// CustomAuthRequest extends the Express Request object to include user information
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email?: string; // Optional email
    username?: string; // Optional username
    tier?: 'free' | 'paid'; // Make tier optional
  };
}

// UserPayload interface represents the payload of a user in your application
export interface UserPayload {
  id: string;
  email?: string; // Optional email
  username?: string; // Optional username
  tier?: 'free' | 'paid'; // Make tier optional here as well
}
