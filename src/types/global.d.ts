// src/types/global.d.ts

declare global {
    namespace Express {
      interface Request {
        user?: { id: string; email: string; username: string }; // Attach user data to the request object
      }
    }
  }
  
  export {};
  