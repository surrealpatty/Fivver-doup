import { Request } from 'express';

// Define the CustomAuthRequest interface, extending Request to include a user property
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email?: string;  // Optional field, can be omitted
    username?: string;  // Optional field, can be omitted
    tier: 'free' | 'paid';  // Required field for tier
    role?: 'user' | 'admin';  // Optional role field
  };
}

// Optional UserPayload interface, can be used elsewhere in the codebase
export interface UserPayload {
  id: string;
  email?: string;  // Optional, may not be present
  username?: string;  // Optional, may not be present
  tier: 'free' | 'paid';  // Required tier field
  role?: 'user' | 'admin';  // Optional role field
}
