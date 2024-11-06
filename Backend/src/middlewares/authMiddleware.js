import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const authenticateToken = (req, res, next) => {
    // Get the token from Authorization header (Bearer token)
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token and store the decoded user in the request object
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user; // Add decoded user info to the request object for future use

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Handle errors during verification
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default authenticateToken;
