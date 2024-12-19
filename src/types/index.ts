import { JwtPayload } from 'jsonwebtoken';

// Define the shape of the user payload
export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
  role: 'Free' | 'Paid'; // Assuming roles are 'Free' or 'Paid'
}

// Extend Express Request to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;  // Attach the UserPayload to the Request object
  }
}
