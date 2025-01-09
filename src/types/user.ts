import { Request } from 'express';

// Define UserRole as a union of possible user roles
export type UserRole = 'user' | 'admin' | 'moderator'; // Ensure this matches everywhere in the project

// Define the UserPayload interface
export interface UserPayload {
    id: string;
    email?: string;
    username?: string;
    role?: UserRole; // Use the corrected UserRole type
}

// Define the AuthRequest interface (extends Express' Request with an optional user field)
export interface AuthRequest extends Request {
    user?: UserPayload; // Optional user field for unauthenticated requests
}

// Define the CustomAuthRequest interface (extends Request with a mandatory user field)
export interface CustomAuthRequest extends Request {
    user: UserPayload; // Ensure 'user' is always present for authenticated requests
}

// Type guard to check if user exists in the request
export function isUser(req: AuthRequest): req is AuthRequest & { user: UserPayload } {
    return req.user !== undefined; // Explicitly checks if user is set in the request
}
