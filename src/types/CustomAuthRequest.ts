import { Request } from 'express';  // Import Request from Express
import { UserPayload } from './index';  // Import UserPayload from src/types/index

// CustomAuthRequest interface where user is always defined (non-optional)
export interface CustomAuthRequest extends Request {
  user: UserPayload; // CustomAuthRequest expects user to always be defined
}
