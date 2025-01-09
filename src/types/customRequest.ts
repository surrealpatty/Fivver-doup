// src/types/customRequest.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Import UserPayload from the central index file

// Extend the Request interface to include the user field with the correct type
export interface CustomAuthRequest extends Omit<Request, 'user'> {
  user?: UserPayload; // Add an optional user field typed as UserPayload
}
