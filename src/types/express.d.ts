// src/types/express.d.ts

import { User } from '../models'; // Adjust the import path as necessary

declare global {
    namespace Express {
        interface Request {
            user?: User;  // Add the user property to the request object
        }
    }
}

// Ensure this file is treated as a module
export {};
