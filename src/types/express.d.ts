declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };  // Adjust this type based on your user structure
    }
  }
}

export {}; // Ensures this file is treated as a module
