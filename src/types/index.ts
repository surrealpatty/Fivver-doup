import { Request } from 'express';

export interface CustomAuthRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    tier: 'free' | 'paid';
    role?: 'admin' | 'user';
  };
}
