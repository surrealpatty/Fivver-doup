// src/types/index.ts

import { Request } from 'express';
export interface UserPayload {
  id: string;
  email?: string;  // email can be undefined
  username?: string;  // username is optional
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // user can be undefined
}
