// src/types/index.d.ts

declare namespace Express {
  interface Request {
      user: {
          id: string;         // User ID
          email: string;      // User email
          username: string;   // User username
          password?: string;  // Optional password (depending on your use case)
          // Add any other properties that are part of your user model
      };
  }
}
