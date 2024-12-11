// src/types/index.ts

import { Request } from 'express';
import  AuthRequest, isUser  from '../types';  // Ensure `isUser` is defined in ../types

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: 'free' | 'paid';
}

export interface AuthRequest extends Omit<Request, 'user'> {
  user: UserPayload; // Ensure 'user' is always set as UserPayload
}
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';
}