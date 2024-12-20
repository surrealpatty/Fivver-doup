import { Request } from 'express';
import { UserPayload } from './user'; // Import UserPayload from the user types file

// Define AuthRequest interface which extends Express' Request type and includes the user data
export interface AuthRequest extends Request {
  user?: UserPayload;  // Optional user object containing the payload
}
