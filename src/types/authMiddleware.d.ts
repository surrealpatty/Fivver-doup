import { Request } from 'express';
import { UserPayload } from 'src/types/index'; // Assuming you have a UserPayload type

// Define the AuthRequest type, extending the Request type to include user
export interface AuthRequest extends Request {
  user?: UserPayload;  // user is optional, as it can be undefined if not authenticated
}
