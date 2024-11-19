// src/types/express/index.d.ts

declare namespace Express {
    interface Request {
      user: {
        userId: string; // Define the structure of the user object attached to the request
      };
    }
  }
  