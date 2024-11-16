declare module '../middlewares/authMiddleware' {
    export function authenticateToken(req: any, res: any, next: any): void;
  }
  