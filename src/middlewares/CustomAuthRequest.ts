import { Request } from 'express';
import { UserPayload } from '../types';  // Correct import from index.ts

// Extend Request to include the user field with the appropriate type
export interface CustomAuthRequest extends Request {
  user?: UserPayload;  // Ensure the user is of type UserPayload or undefined
}
