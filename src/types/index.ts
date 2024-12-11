import { Request } from 'express';  // Import Request from express

// Define the UserPayload interface
export interface UserPayload {
  id: string;         // The user's unique ID
  email?: string;     // The user's email (optional)
  username?: string;  // The user's username (optional)
  role?: string;      // The user's role (optional, you can change 'role' to 'tier' based on your use case)
  tier?: string;      // The user's subscription tier (optional)
}

// Extend the Express Request interface to include the optional 'user' field
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added to the req object in authenticateToken
}

// Define a type guard to validate UserPayload
export function isUser(user: any): user is UserPayload {
  return user && typeof user.id === 'string';  // Check that 'user.id' is a string (you can add more checks if necessary)
}
