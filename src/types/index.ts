// src/types/index.ts
import { Request } from 'express';

// Defining CustomAuthRequest to extend the Request interface with the user property
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email?: string;  // Optional to allow missing email in some cases
    username?: string;  // Optional to allow missing username in some cases
    tier: 'free' | 'paid';  // Required tier property
    role?: 'user' | 'admin'; // Optional role property
  };
}

// Optional UserPayload interface if it's needed elsewhere
export interface UserPayload {
  id: string;
  email?: string;  // Optional
  username?: string;  // Optional
  tier: 'free' | 'paid';  // Required field for tier
  role?: 'user' | 'admin';  // Optional
}
