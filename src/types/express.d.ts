// Import the UserPayload interface from index.ts
import { UserPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure the user property matches the UserPayload type
    }
  }
}
