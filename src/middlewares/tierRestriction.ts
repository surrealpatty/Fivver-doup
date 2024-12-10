// src/middlewares/tierMiddleware.ts
import { AuthRequest } from '../types'; // Ensure correct import of AuthRequest

export const tierMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user; // User should be of type UserPayload

  if (!user || user.tier !== 'paid') {
    res.status(403).json({ message: 'Access restricted to paid users only.' });
    return;
  }

  next();  // Allow access if the user is paid
};
