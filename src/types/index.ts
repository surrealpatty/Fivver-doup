import { Request } from 'express';  // Import Request from express

// Define the UserPayload interface
export interface UserPayload {
  id: string;                // The user's unique ID
  email: string;             // The user's email
  username: string;          // The user's username
  password: string;          // The user's password (important for authentication)
  role: string;              // The user's role (e.g., admin, user, etc.)
  tier: string;              // The user's subscription tier (e.g., free, paid, etc.)
  isVerified: boolean;       // Whether the user's email is verified
  resetToken: string | null; // The user's password reset token (if any)
  resetTokenExpiration: Date | null; // The expiration date of the reset token (if any)
}

// Extend the Express Request interface to include the optional 'user' field
export interface AuthRequest extends Request {
  user?: UserPayload;  // The 'user' field is optional and will be added to the req object in authenticateToken
}

// Define a type guard to validate UserPayload
export function isUser(user: any): user is UserPayload {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.username === 'string' &&
    typeof user.password === 'string' &&
    typeof user.role === 'string' &&
    typeof user.tier === 'string' &&
    typeof user.isVerified === 'boolean' &&
    (user.resetToken === null || typeof user.resetToken === 'string') &&
    (user.resetTokenExpiration === null || user.resetTokenExpiration instanceof Date)
  );  // Check that all required fields exist with the correct types
}
