declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role?: string;
      };
    }
  }
}

// Ensure this file is treated as a module by adding an export statement
export {};
