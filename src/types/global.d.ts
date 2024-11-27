// src/types/global.d.ts

// Extend the Express namespace to include the custom `user` property in the Request object
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}

// Export an empty object to ensure the file is treated as a module
export {};
