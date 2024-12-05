import { Request } from 'express';

// Assuming this is your UserPayload structure
export interface UserPayload {
    id: string;
    email: string;
    username: string;
    tier: string;  // Make sure 'tier' is present in the payload
}

// Extending the Request type to include the `user` object
export interface AuthRequest extends Request {
    user?: UserPayload;  // This should include the `tier` field
}
