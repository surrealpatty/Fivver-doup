import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';  // Ensure correct import of the UserPayload type

// Secret key for JWT generation and verification
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Use environment variable for security

// Utility function to generate a JWT token
export const generateToken = (user: UserPayload): string => {
  // Ensure user object contains required properties
  const payload: UserPayload = {
    id: user.id,
    email: user.email,  // Ensure email is part of the payload
    username: user.username,
    tier: user.tier,  // Include tier if it's part of the user model
    role: user.role,  // Include role for authorization purposes
  };

  try {
    // Sign and return the token with a 1-hour expiration
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  } catch (err) {
    // Log the error and throw a custom error if token generation fails
    console.error('Token generation failed:', err);
    throw new Error('Failed to generate token');
  }
};

// Function to verify a JWT token and return the decoded user data
export const verifyToken = (token: string): UserPayload | null => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

    // Return the decoded user payload if verification is successful
    return decoded;
  } catch (err) {
    // Log the error and return null if verification fails
    console.error('Token verification failed:', err);
    return null;  // Return null for invalid or expired tokens
  }
};
