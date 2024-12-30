import { Request } from 'express';

export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // Make user optional to handle undefined cases
}
