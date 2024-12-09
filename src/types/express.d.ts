import { UserPayload } from '@types'; // Adjust import to your correct path

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Add the `user` property to the Request interface
    }
  }
}

export {}; // To make this file a module
