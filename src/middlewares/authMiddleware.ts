import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authenticateToken from './middlewares/authMiddleware';  // Check if this path resolves correctly

// Define an interface for the JWT payload (including the id field)
interface CustomJwtPayload extends JwtPayload {
    id: string;  // Assuming `id` is a string, change this if needed (e.g., number)
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Expecting Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    // Secret key for JWT (could be loaded from environment variables)
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

    // Verify the token using the secret key
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // If user is defined, cast it to CustomJwtPayload
        if (!user) {
            return res.status(400).json({ message: 'Invalid token payload' });
        }

        const customUser = user as CustomJwtPayload;

        // Ensure `userId` is a number, even if the token contains it as a string
        req.userId = Number(customUser.id);

        if (isNaN(req.userId)) {
            return res.status(400).json({ message: 'Invalid userId in token' });
        }

        // Proceed to the next middleware or route handler
        next();
    });
};

export default authenticateToken;
