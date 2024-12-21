// Import necessary types and interfaces from other files
import { Request } from 'express';
import { UserPayload } from './user';  // Assuming UserPayload is defined in 'user.ts'
import { AuthRequest as BaseAuthRequest } from './authRequest';  // Correct import path for AuthRequest and CustomAuthRequest

// Type guard to check if the user exists in the request
export function isUser(req: BaseAuthRequest): req is BaseAuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}

// Export the interfaces without redeclaring them
export { UserPayload } from './user';  // Re-export UserPayload
export { CustomAuthRequest } from './authRequest';  // Re-export CustomAuthRequest (without redeclaring)

