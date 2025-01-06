// src/types/express/index.d.ts

import { User } from '../../models/user';  // Adjust the path to match your project structure

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Augment the Request type to include the `user` property of type User
    }
  }
}
