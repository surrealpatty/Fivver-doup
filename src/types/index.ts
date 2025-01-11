// Import necessary types from the correct file (UserRoles.ts)
import { UserPayload, UserRole, UserTier } from './UserRoles'; // Correct the path based on your folder structure
import { Request } from 'express';

// Export the types to ensure they are available for import elsewhere
export { UserPayload, UserRole, UserTier };

// Define CustomAuthRequest to extend Express Request and include the user field
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // Optional user field (holds the UserPayload)
}
