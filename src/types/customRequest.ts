// src/types/customRequest.ts
import { Request } from 'express';
import { UserPayload } from './index'; // Adjust the import path if necessary

export interface CustomAuthRequest extends Request {
    user?: UserPayload; // user is optional to handle unauthenticated requests
}
