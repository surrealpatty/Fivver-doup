import { UserPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Make sure this matches your custom `UserPayload` interface
    }
  }
}
