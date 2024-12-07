import { UserPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;  // Ensure this matches your custom `UserPayload` interface
    }
  }
}
