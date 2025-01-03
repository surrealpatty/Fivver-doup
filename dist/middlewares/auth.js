import jwt from 'jsonwebtoken';
import config from '../config/config'; // Assuming your config is properly set up
// Middleware to verify the JWT
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    // Verify the token using the secret from config
    jwt.verify(token, config.JWT_SECRET, // JWT_SECRET is already a string in the config
    (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message });
        }
        // Ensure decoded payload is valid and contains an ID
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            const decodedToken = decoded;
            req.userId = String(decodedToken.id); // Store the userId in the request object
            return next(); // Proceed to the next middleware
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    });
};
// Function to generate a JWT for a user
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, // Payload containing the user ID
    config.JWT_SECRET, // JWT_SECRET from config
    {
        expiresIn: config.JWT_EXPIRATION, // JWT_EXPIRATION from config
    });
};
// Middleware to authenticate the user based on the JWT
export const authenticateJWT = (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ message: 'No valid token or userId found.' });
    }
    next(); // User authenticated, proceed to the next middleware or route handler
};
