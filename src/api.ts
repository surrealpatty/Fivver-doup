// src/api.ts

import { Request, Response } from 'express';

// Define the result type explicitly, e.g., an object with a message
interface Result {
  message: string;
}

// Function now returns a more specific type
export const someFunction = (_req: Request, _res: Response): Result => {
  // Function implementation
  const result: Result = { message: 'success' }; // Explicit type for result

  return result;  // Returning Result type
};
