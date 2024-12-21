// src/types/index.ts

// Import interfaces from other files
import { UserPayload } from '@user';  // Import UserPayload from user.ts
import { AuthRequest, CustomAuthRequest } from './authRequest';  // Import from the correct relative path

// Type guard to check if the user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
  return req.user !== undefined; // Explicitly checks if user is set in the request
}

// Export the interfaces
export { UserPayload } from '@user';  // Export UserPayload
export { AuthRequest, CustomAuthRequest } from './authRequest';  // Export AuthRequest and CustomAuthRequest
