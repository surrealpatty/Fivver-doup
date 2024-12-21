// src/types/authRequest.ts
import { Request } from 'express';
import { UserPayload } from './user';  // Import the UserPayload interface from user.ts

export interface AuthRequest {
    user: UserPayload;
    // Add any other custom properties needed for the request object
}
// Define the CustomAuthRequest interface (extends Request with a mandatory user property)
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // Ensure user is never undefined
}
