// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };  // Ensure the shape matches your logic (use id instead of userId)
    }
  }
}

export {}; // Ensures this file is treated as a module
