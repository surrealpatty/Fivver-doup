// src/types/custom.d.ts
import { User } from '../models'; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the `user` property
    }
  }
}
