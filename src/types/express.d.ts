// src/types/express.d.ts

import { User } from '../models/user'; // Correct import path for User model

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Attach the user object to the request
    }
  }
}

// Ensure this file is treated as a module
export {};
