// src/types/index.ts

import { Request } from 'express';

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: 'free' | 'paid';
}

export interface AuthRequest extends Omit<Request, 'user'> {
  user: UserPayload; // Ensure 'user' is always set as UserPayload
}
