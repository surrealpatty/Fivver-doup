// src/types/index.ts
import { Request } from 'express';  // Import Request from express
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;  // Add tier field
}

export interface AuthRequest extends Request {
  user?: UserPayload;  // Allow user to be optional
}

export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';
}