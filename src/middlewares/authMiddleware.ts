import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define an interface for the JWT payload
interface CustomJwtPayload extends JwtPayload {
    id: string;  // Assuming `id` is a string, change if needed
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';  // Secret key from environment

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const customUser = user as CustomJwtPayload;

        // Ensure that `userId` is a number (convert from string if necessary)
        req.userId = Number(customUser.id);

        if (isNaN(req.userId)) {
            return res.status(400).json({ message: 'Invalid userId in token' });
        }

        next();
    });
};

export default authenticateToken;
