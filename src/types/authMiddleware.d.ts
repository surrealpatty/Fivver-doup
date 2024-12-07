// src/types/authMiddleware.d.ts
import { Request } from 'express';  // Import Request from Express
import { UserPayload } from './index';  // Import UserPayload from src/types/index.ts

// Extend the Request interface to include the 'user' data
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user property with the correct type
}
