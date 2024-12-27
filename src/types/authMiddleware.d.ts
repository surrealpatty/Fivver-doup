// C:\surrealsystems\Fivver-doup\src\types\authMiddleware.d.ts

// Augmenting the Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number; // Optional userId on the request object
    }
  }
}

// This ensures the file is treated as a module.
export {};
