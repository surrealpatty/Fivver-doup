// src/types/index.ts
import { Request } from 'express';

// UserPayload interface
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
}

// AuthRequest interface that extends Express Request
export interface AuthRequest<ReqBody = any, ReqQuery = any, ReqParams = any, ReqLocals = Record<string, any>> 
  extends Request<ReqParams, any, ReqBody, ReqQuery, ReqLocals> {
  user?: UserPayload;  // Add 'user' field, which is optional
}
