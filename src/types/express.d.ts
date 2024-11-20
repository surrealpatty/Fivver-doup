// src/types/express.d.ts

declare global {
  namespace Express {
    // Extending the Request interface to include the `user` property
    interface Request {
      user?: { 
        id: number;         // User ID should match your database model type
        username: string;   // Add other properties as needed (e.g., email, role, etc.)
        // You can add more user-related properties here if required
      };
    }
  }
}

// Ensure this file is treated as a module by adding an export statement
export {};
