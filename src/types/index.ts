// src/types/index.ts

import { Request } from 'express';

export interface UserPayload {
  id: string;
  email?: string; // Make email optional
  username?: string; // Make username optional
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // user can be undefined
}
