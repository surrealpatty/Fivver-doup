declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role?: string; // Optional role field
      };
    }
  }
}

// Ensure that this file is treated as a module
export {};
