import { Request } from 'express';

// Remove the import of UserPayload since it’s already declared below
// export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
//   return req.user !== undefined; // Explicitly check for undefined
// }

// Define the UserPayload interface (no need to import it)
export interface UserPayload {
  id: string;
  email?: string;
  username?: string;
  tier?: string;
}

// Define the AuthRequest interface extending Express' Request
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optionally add user property to the request object
}

// Define the type guard to check if the user is present
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly check for undefined
}
