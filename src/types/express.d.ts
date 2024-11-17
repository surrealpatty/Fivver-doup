// src/types/express.d.ts
import { User } from '../models/user'; // Correct import path for User model

declare global {
  namespace Express {
    interface Request {
      userId?: number;  // Add userId to the Request object
      user?: User;      // Attach the user object to the request (optional)
    }
  }
}

// Ensure this file is treated as a module
export {};
