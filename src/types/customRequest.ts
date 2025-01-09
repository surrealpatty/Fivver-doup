// src/types/customRequest.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Import the UserPayload interface correctly from the centralized types

// Interface extends Request to add the optional user field typed as UserPayload
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Correctly typing the `user` field with UserPayload
}
