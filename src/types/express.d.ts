// src/types/express.d.ts
import { UserPayload } from './index'; // Import your UserPayload interface
import { Multer } from 'multer'; // Import Multer types for file uploads

declare global {
  namespace Express {
    // Augmenting the Request interface to include 'user' and 'file'
    interface Request {
      user?: UserPayload;  // Add the 'user' property from UserPayload
      file?: Multer.File;   // Add the 'file' property for Multer file uploads
    }
  }
}

export {}; // This ensures the file is treated as a module
