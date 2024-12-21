// src/types/index.ts

import { Request } from 'express';  // Make sure you import Request from 'express'

export interface UserPayload {
    id: string;
    email: string;  // Make sure 'email' is required if needed
    username: string;
}

// Directly define and export CustomAuthRequest
export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // Ensure the user is typed correctly
}

