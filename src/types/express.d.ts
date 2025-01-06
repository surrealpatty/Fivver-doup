// src/types/express.d.ts

import { Request } from 'express';
import { Multer } from 'multer';  // Importing Multer for file handling
import { UserPayload } from './index';  // Import your UserPayload interface from index.ts

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Augmenting the Request type to include user information
      file?: Multer.File;  // Augmenting the Request type to handle Multer file uploads
    }
  }
}
