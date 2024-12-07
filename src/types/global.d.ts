// src/types/global.d.ts

import { UserPayload } from './index';

// Extend the Express namespace to include the custom `user` property in the Request object
declare global {
  namespace Express {
    interface Request {
  
    }
  }
}

// Export an empty object to ensure the file is treated as a module
export {};
