import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        // Handle token verification errors
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        
        // Store user info in request for access in next middleware
        req.user = user;
        next();
    });
};

export default authenticateToken;
