// src/middlewares/authMiddleware.d.ts

import { Request } from 'express';

// Declare the User interface for request.user
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  subscription: string;
}

// Extend Express' Request interface with a `user` property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
