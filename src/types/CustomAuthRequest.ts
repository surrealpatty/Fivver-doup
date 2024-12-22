// src/types/customAuthRequest.ts
import { Request } from 'express';
import { UserPayload } from './index'; // assuming you have UserPayload defined here

export interface CustomAuthRequest extends Request {
    user: UserPayload; // Make user non-optional to match the type expected by Express
}
