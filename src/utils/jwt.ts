import jwt, { JwtPayload } from 'jsonwebtoken';
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

// Verify JWT token
export const verifyToken = (token: string): UserPayload | null => {
  try {
    // Verify the token and return the decoded payload
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Check if decoded payload has the expected fields for UserPayload
    if (decoded && 'id' in decoded && 'email' in decoded) {
      // Assuming decoded payload matches UserPayload structure
      return decoded as UserPayload;
    }

    // If the decoded payload doesn't match expected structure, return null
    return null;
  } catch (err) {
    // Log the error and return null if verification fails
    console.error('Token verification failed:', err);
    return null;
  }
};
