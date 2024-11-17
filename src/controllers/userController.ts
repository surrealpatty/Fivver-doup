import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define an interface for the JWT payload (add any other fields your token includes)
interface CustomJwtPayload extends JwtPayload {
    id: string; // Assuming `id` is a string, change if it's a different type (e.g., number)
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Type assertion to ensure `user` is the custom JwtPayload
        const customUser = user as CustomJwtPayload;

        // Now that TypeScript knows `customUser` has an `id`, we can safely access it
        req.userId = customUser.id;  // Assuming the token has a userId property
        next();
    });
};

export default authenticateToken;
