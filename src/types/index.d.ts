// src/types/index.d.ts

import { Request } from 'express'; // Importing Request from Express

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;         // User ID
        email: string;      // User email
        username: string;   // User username
        password?: string;  // Optional password (depending on your use case)
        // Add any other properties that are part of your user model
      };
    }
  }
}
