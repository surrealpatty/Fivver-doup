import jwt from 'jsonwebtoken'; // Use only the default import
import config from '../config/config'; // Import configuration
import { Request, Response, NextFunction } from 'express'; // Import types from express

// Define a custom JwtPayload interface to type the decoded payload
interface JwtPayload {
  id: string; // Adjust fields based on your payload structure
  [key: string]: any; // Optionally allow additional fields
}

// Utility function to get the configuration for the current environment
const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  if (env in config) {
    return config[env as keyof typeof config];
  }
  throw new Error(`Invalid NODE_ENV: ${env}`);
};

// Extract configuration variables
const { JWT_SECRET, JWT_EXPIRATION } = getConfig();

// Function to generate a token
export const generateToken = (payload: object): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION || '1h' }); // Default to 1-hour expiration
  } catch (error) {
    if (error instanceof Error) { // Type guard to handle unknown error type
      console.error('Error generating token:', error.message);
    } else {
      console.error('Unknown error generating token');
    }
    throw new Error('Token generation failed');
  }
};

//
