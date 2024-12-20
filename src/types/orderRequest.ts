// src/types/orderRequest.ts
import { UserPayload } from '../types'; // Correct the import to match the export


export interface OrderRequest extends Request {
  user?: UserPayload; // Ensure 'user' is correctly typed
}
