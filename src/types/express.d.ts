// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string }; // Make sure the shape includes id
    }
  }
}

export {};  // Ensures this file is treated as a module
