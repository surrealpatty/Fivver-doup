import { JwtPayload } from 'jsonwebtoken';

// Define the shape of the user payload
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;  // Make sure `username` is optional (string | undefined)
}

// Extend Express Request to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;  // Attach the UserPayload to the Request object
  }
}
