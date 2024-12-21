
// Import AuthRequest and CustomAuthRequest from the correct file
import { AuthRequest as BaseAuthRequest, CustomAuthRequest } from './authRequest';  // Correct path to authRequest file
import { Request } from 'express';
import { UserPayload } from './index';  // Import UserPayload if needed

// Type guard to check if the user exists in the request
export function isUser(req: BaseAuthRequest): req is BaseAuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}

// Export the interfaces
export { UserPayload } from './user';  // Re-export UserPayload
export { CustomAuthRequest } from './authRequest';  // Re-export CustomAuthRequest

export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional `user` property that holds the decoded user info
}