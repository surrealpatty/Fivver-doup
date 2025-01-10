import { UserPayload } from './index'; // Import UserPayload type from your index file
import { Multer } from 'multer'; // Import Multer types for file uploads

declare global {
  namespace Express {
    // Augmenting the Request interface to include 'user' and 'file' properties
    interface Request {
      user?: UserPayload;   // Add the 'user' property from UserPayload interface
      file?: Multer.File;    // Add the 'file' property for Multer file uploads
    }
  }
}

export {}; // This ensures the file is treated as a module, and no global variables are leaked
