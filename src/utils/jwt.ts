import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Import the correct UserPayload type

// Secret key for JWT generation and verification (ensure this is securely stored in environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Fallback to a default if not set

// Generate JWT token
export const generateToken = (user: UserPayload): string => {
  // Create the payload with user details
  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    tier: user.tier,  // Include all necessary fields from UserPayload
    role: user.role,  // Include role if it's part of your user model
  };

  // Sign and return the token with 1 hour expiration
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify JWT token and return the decoded user data
export const verifyToken = (token: string): { user: UserPayload } | null => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as { user: UserPayload }; // Expect the decoded token to have a `user` property

    // If the decoded token contains the expected structure, return the user data
    if (decoded && decoded.user) {
      return decoded;  // Return the object containing the `user` property
    }

    // If the decoded payload doesn't match the expected structure, return null
    return null;
  } catch (err) {
    // Log the error and return null if verification fails
    console.error('Token verification failed:', err);
    return null;
  }
};
