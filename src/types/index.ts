// src/types/index.ts
import { Request } from 'express';  // Import Request from express

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;  // Assuming `tier` is part of the UserPayload
}

export interface AuthRequest extends Request {
  user?: UserPayload; // The 'user' field is optional
}

// Define the isUser type guard
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Add more checks as needed
}
