// src/types/orderRequest.ts or similar
import { UserPayload } from './index';

export interface OrderRequest extends Request {
  user?: UserPayload; // Ensure 'user' is correctly typed
}
