import { Request } from 'express';  // Import Express's Request type

// Define the UserPayload interface with required email and optional username
export interface UserPayload {
  id: string;
  email: string;  // Email is required
  username?: string;  // Username remains optional
}

// Define the AuthRequest interface that extends Express's Request
export interface AuthRequest<ReqBody = any, ReqQuery = any, ReqParams = any, ReqLocals = Record<string, any>> 
  extends Request<ReqParams, any, ReqBody, ReqQuery, ReqLocals> {
  user?: UserPayload;  // Make 'user' optional
}
