// src/types/index.ts
import { Request } from 'express';  // Importing the Request type from express

export interface UserPayload {
  id: string;
  email?: string;  // Make email optional if needed
  username?: string;  // Make username optional if needed
}

// Ensure AuthRequest extends Express' Request type
export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach the `user` property to the Request type
}
