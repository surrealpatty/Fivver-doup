// Import the base Request type from Express
import { Request } from 'express';

// Define the UserPayload interface properly
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string; // Add tier property
}

export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure 'user' has the correct type (i.e., UserPayload)
}
export interface AuthRequest extends Request {
  user: UserPayload;
}