// src/config.ts

// You can either use an environment variable or a default value for the JWT secret
export const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
