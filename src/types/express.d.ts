// src/types/express.d.ts
import { Request } from 'express';
import { Multer } from 'multer';  // Importing Multer for file handling
import { UserPayload } from './index';  // Ensure UserPayload interface is correctly imported

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Augmenting the Request type to include user information
      file?: Multer.File;  // Augmenting the Request type to handle Multer file uploads
    }
  }
}
