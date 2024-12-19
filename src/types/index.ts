import { Request } from 'express'; // Import Express Request

// Define the shape of the user payload
export interface UserPayload {
    id: string;       // User ID (required)
    email: string;    // Email (required)
    username?: string; // Username (optional)
}

// Extend Express Request to include the user property
export interface CustomAuthRequest extends Request {
    user: UserPayload;  // Attach the UserPayload to the Request object (non-optional)
}
