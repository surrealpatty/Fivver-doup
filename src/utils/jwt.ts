import jwt from 'jsonwebtoken'; // Import the 'jsonwebtoken' library
import { UserPayload } from '../types';  // Importing the UserPayload type for type safety

// Secret key for JWT generation and verification (ensure this is securely stored in environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Fallback secret key for JWT

// Utility function to generate JWT token
export const generateToken = (user: UserPayload): string => {
  // Create the payload with user details
  const payload: UserPayload = {
    id: user.id,
    email: user.email,  // Include email as part of the payload
    username: user.username,
    tier: user.tier,  // Include all necessary fields from UserPayload
    role: user.role,  // Include role if it's part of your user model
  };

  // Sign and return the token with 1 hour expiration
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify JWT token and return the decoded user data
export const verifyToken = (token: string): UserPayload | null => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string, email: string, username?: string, tier?: string, role?: string }; // Manually specify the expected type

    // Return the decoded user payload if verification is successful
    return decoded;
  } catch (err) {
    // Log the error and return null if verification fails
    console.error('Token verification failed:', err);
    return null; // Return null if the token is invalid or expired
  }
};
