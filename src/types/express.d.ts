// src/types/express.d.ts
import { Request } from 'express';
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        username?: string;
        role: 'Free' | 'Paid'; // Ensure this matches the role types you use
      };
      file?: Multer.File; // This is for the file property you are augmenting
    }
  }
}
