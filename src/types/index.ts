// src/types/index.ts

import { Request } from 'express';
import { UserPayload } from './user';  // Import UserPayload type from the correct file, assuming it's in src/types/user.ts

// Extend Express's Request to include `user` as an optional property
export interface CustomAuthRequest extends Request {
  user?: UserPayload; // `user` is optional and will be set by the middleware if the token is valid
}
