// src/types/express.d.ts

import { User } from '../models/user'; // Adjust the import path to the correct User model

declare global {
    namespace Express {
        interface Request {
            user?: User;  // Extend the Express Request object to include a user property
        }
    }
}

// Ensure this file is treated as a module
export {};
