import { User } from '../models/user';  // Correct the relative path to the User model
import Service from '../models/services';  // Correct the relative path to the Service model
import jwt from 'jsonwebtoken';  // Import jsonwebtoken for generating the token

// Function to generate a mock JWT token for a user
export const createMockUserToken = (user: { id: string; email: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username }, // Payload
    'your_secret_key', // Secret key (should be stored securely, not hardcoded)
    { expiresIn: '1h' } // Token expiration
  );
};
