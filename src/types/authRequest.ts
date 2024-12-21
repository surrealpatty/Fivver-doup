// src/types/authRequest.ts
import { Request } from 'express';
import { UserPayload } from './user';  // Import the UserPayload interface from user.ts

// Define the AuthRequest interface (extends the basic Request interface with an optional user property)
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user (for unauthenticated requests)
}

// Define the CustomAuthRequest interface (extends Request with a mandatory user property)
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure user is never undefined
}
