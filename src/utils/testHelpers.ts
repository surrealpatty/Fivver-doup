// Import necessary dependencies
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
import { User } from '../models/user';  // Correct relative path to User model
import Service from '../models/services';  // Correct relative path to Service model

// Function to generate a mock JWT token for a user
export const createMockUserToken = (user: { id: string; email: string; username: string }): string => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username }, // Payload
    'your_secret_key', // Secret key (should be stored securely, not hardcoded)
    { expiresIn: '1h' } // Token expiration time
  );
};
