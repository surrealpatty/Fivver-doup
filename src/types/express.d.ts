import { UserPayload } from '../models/User'; // Adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Consistently declare the 'user' property across your app
    }
  }
}

export {}; // To make this a module
