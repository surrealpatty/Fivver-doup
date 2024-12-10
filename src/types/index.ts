// src/types/index.ts

import { Request } from 'express';

// Define the AuthRequest type extending the Request interface
export interface AuthRequest extends Request {
  user?: any;  // Adding a user property to store the authenticated user info
}
