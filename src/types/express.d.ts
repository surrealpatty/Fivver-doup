// src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Ensure userId is a string
    }
  }
}

export {};  // Ensure this file is treated as a module
