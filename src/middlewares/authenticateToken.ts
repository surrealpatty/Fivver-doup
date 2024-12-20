import { Response, NextFunction } from 'express';  // Import Response and NextFunction from express
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest from types

// Middleware to authenticate user token
const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
    // Check for token in the authorization header
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    // Token validation logic (simplified, should be more robust in production)
    const token = req.headers.authorization.split(' ')[1];  // Assuming token is in "Bearer <token>" format

    // Validate token logic here (e.g., jwt.verify(token, secret), etc.)
    try {
        // Simulate token verification and attaching user to the request (replace with actual logic)
        req.user = { 
            id: '123', 
            email: 'user@example.com', 
            username: 'johndoe', 
            tier: 'free', 
            role: 'user' 
        };  // Example payload for simulation

        // Proceed to the next middleware or route handler
        next();  
    } catch (error) {
        // Handle token verification errors
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateToken;  // Default export
