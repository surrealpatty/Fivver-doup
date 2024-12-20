// src/utils/jwt.ts

import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';

// Your secret key or public key
const SECRET_KEY = 'your-secret-key';

// Function to verify the token
export const verifyToken = (token: string): { user: UserPayload } | null => {
  try {
    // Decode the token (adjusted to match the structure you're expecting)
    const decoded = jwt.verify(token, SECRET_KEY) as { user: UserPayload };
    return decoded;  // This should return an object containing the `user` property
  } catch (error) {
    return null;  // If verification fails, return null
  }
};
