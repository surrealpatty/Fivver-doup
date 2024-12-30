import { Request } from 'express';
import { UserPayload } from '../types'; // Adjust the path as necessary

export interface CustomAuthRequest extends Request {
  user?: UserPayload; // user is of type UserPayload and can be optional
}
