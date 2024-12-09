import { UserPayload } from '../models/User'; // Adjust path if needed
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Declare the 'user' property with the UserPayload type
    }
  }
}

export {}; // This ensures the file is treated as a module
