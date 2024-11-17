// src/types/express.d.ts
declare global {
  namespace Express {
      interface Request {
          user?: { userId: number; username: string };  // Or any other shape of the user object
      }
  }
}

export {};
