// src/types/authMiddleware.ts

import { Request } from 'express';

// Define the structure of the user data attached to the request
export interface UserPayload {
  id: string;
  email: string;
  username: string;
  tier: string;  // Ensure that 'tier' is included in the UserPayload structure
}

// Extend the Request interface to include user data
export interface AuthRequest extends Request {
  user?: UserPayload;  // This user will contain id, email, username, and tier
}
