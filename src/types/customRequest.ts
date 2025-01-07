// src/types/customRequest.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Import the UserPayload interface

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Ensure that `user` is correctly typed as `UserPayload`
}
