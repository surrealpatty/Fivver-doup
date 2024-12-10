// src/types/authMiddleware.ts

import { Request } from 'express';
import { UserPayload } from './index'; // Correct path to UserPayload type

// Interface extending the express Request type, adding the optional 'user' property
export interface AuthRequest extends Request {
  user?: UserPayload;  // 'user' can be 'UserPayload' or 'undefined'
}
