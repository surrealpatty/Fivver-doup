// src/types/express.d.ts

import { UserPayload } from '@types'; // Adjust the import path if needed
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Define the user property with the appropriate type
    }
  }
}

export {}; // To make this a module
