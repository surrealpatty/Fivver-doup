import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;  // Optional file property for multer handling
    }
  }
}
