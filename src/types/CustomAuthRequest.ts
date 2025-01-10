import { Request } from 'express';
import { UserPayload } from './index';  // Import from correct path

// CustomAuthRequest interface where user is always defined (non-optional)
export interface CustomAuthRequest extends Request {
  user: UserPayload;  // CustomAuthRequest expects user to always be defined
}
