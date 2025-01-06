// src/types/request.d.ts

import { Request } from 'express';  // Import the Request type from express
import { UserPayload } from './index';  // Import UserPayload from your types

// Define AuthRequest interface that extends Request
export interface AuthRequest extends Request {
    user?: UserPayload;  // The user property is optional and typed as UserPayload
}

// Define CustomAuthRequest interface that also extends Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // Same user property typed as UserPayload
}
