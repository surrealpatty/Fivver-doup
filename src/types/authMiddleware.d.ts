import { Request } from 'express';

// Define the structure of the UserPayload interface
export interface UserPayload {
    id: string;
    email: string;
    username: string;
    tier: string;  // Ensure 'tier' is required here
}

// Extending the Express Request type to include the `user` object
export interface AuthRequest extends Request {
    user?: UserPayload;  // This will include the 'tier' field
}
