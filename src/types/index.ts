import { Request } from 'express';  // Import Request from 'express'

// Define UserPayload with optional email and username
export interface UserPayload {
    id: string;
    email?: string;  // Make email optional
    username?: string;  // Make username optional
}

// Define and export CustomAuthRequest that extends the base Request
export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // user can be undefined, hence optional
}

// No need for 'export { CustomAuthRequest }' since it's already being exported
