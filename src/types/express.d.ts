declare global {
  namespace Express {
    // Extending the Request interface to include the `user` property
    interface Request {
      user?: { 
        id: string;         // Ensure the user ID type matches the expected token payload (e.g., string for JWT)
        email: string;      // Assuming the payload includes email
        username: string;   // Assuming the payload includes username
        role?: string;      // Optional field for user role if needed
        // You can add more user-related properties here if required
      };
    }
  }
}

// Ensure this file is treated as a module by adding an export statement
export {};
