// Import UserPayload from the user file
import { UserPayload } from './user';  // Correct import path for UserPayload
// Import AuthRequest and CustomAuthRequest from the correct file
import { AuthRequest as BaseAuthRequest, CustomAuthRequest } from './authRequest';  // Correct path to authRequest file

// Type guard to check if the user exists in the request
export function isUser(req: BaseAuthRequest): req is BaseAuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}

// Export the interfaces
export { UserPayload } from './user';  // Re-export UserPayload
export { CustomAuthRequest } from './authRequest';  // Re-export CustomAuthRequest

// Optionally, export AuthRequest as a renamed type to avoid conflicts
export type AuthRequest = BaseAuthRequest;
