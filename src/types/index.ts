// src/types/index.ts
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;  // Optional, depending on your needs
}

import { Request } from 'express';

// Export AuthRequest interface
export interface AuthRequest extends Request {
  user?: UserPayload;  // Attach the user property to the request object
}
