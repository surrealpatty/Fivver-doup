import { Request } from 'express';

export interface CustomAuthRequest {
  user: {
    id: string;
    email: string;
    username: string;
    tier: "free" | "paid";
    role?: "user" | "admin";
  };
}
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier: 'free' | 'paid';
  role?: 'user' | 'admin';
}
