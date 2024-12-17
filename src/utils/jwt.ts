import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../types'; // Import the correct UserPayload type

// Define the JWT secret key (ensure it's securely stored in your environment variables)
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Fallback to default if not set

// Generate JWT token
export const generateToken = (user: UserPayload): string => {
  // Create the payload with user details
  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  // Sign and return the token with 1 hour expiration
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });  // Token expires in 1 hour
};

// Verify JWT token
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    // Verify the token and return decoded payload
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (err) {
    // If token is invalid or expired, return null
    console.error('Token verification failed:', err);
    return null;
  }
};
