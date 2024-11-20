// Extend the Express.Request type globally to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { 
        id: number;         // User ID should match your database model type
        username: string;   // Add other properties as needed (e.g., email, role, etc.)
      };
    }
  }
}

// Ensure this file is treated as a module by adding an export statement
export {};
