// Import necessary types from the correct file (UserRoles.ts)
import { UserPayload, UserRole, UserTier } from './UserRoles'; // Adjust the path based on your folder structure
import { Request } from 'express';

// Define CustomAuthRequest to extend Express Request and include the user field
export interface CustomAuthRequest extends Request {
  user?: UserPayload;       // Optional user field (holds the UserPayload)
}
