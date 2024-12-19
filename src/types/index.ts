import { Request } from 'express';

// Define the CustomAuthRequest interface
export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}
