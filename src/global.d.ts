// global.d.ts

declare global {
    namespace Express {
      export interface Request {
        user?: { id: string; email: string; username: string }; // `user` can be optional
      }
    }
  }
  
  export {}; // Ensures the file is treated as a module
  