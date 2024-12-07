import { UserPayload } from './index';  // Import UserPayload

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Add the 'user' property to the Request interface
    }
  }
}
