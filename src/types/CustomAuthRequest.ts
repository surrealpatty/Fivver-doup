// src/types/customAuthRequest.ts

import { Request } from 'express';  // Import Request from Express
import { UserPayload } from './index';  // Import UserPayload from index.ts

// Define the CustomAuthRequest interface that extends the Express Request interface
export interface CustomAuthRequest extends Request {
    user?: UserPayload;  // 'user' is of type UserPayload and can be optional (undefined)
}
