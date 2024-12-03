import User from '../models/user'; // Ensure correct import from user model

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the `user` property to Request
    }
  }
}
