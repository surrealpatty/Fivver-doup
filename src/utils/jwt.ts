import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the user payload type
interface User {
  id: string;
  email: string;
}

// Define the JWT secret
const secret = process.env.JWT_SECRET || 'your_jwt_secret';  // Store your secret securely in .env

// Generate JWT token
const generateToken = (user: User): string => {
  const payload: User = { id: user.id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: '1h' });  // Token expires in 1 hour
};

// Verify JWT token
const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    return null; // Invalid token
  }
};

export { generateToken, verifyToken };
